import { push } from 'react-router-redux';
import { httpGet, httpPost, httpPut, httpDelete } from '../utils/http';

const CREATE_LINK_SUCCESS = 'CREATE_LINK_SUCCESS';
const CREATE_LINK_RESET = 'CREATE_LINK_RESET';
const CREATE_LINK_ERROR = 'CREATE_LINK_ERROR';

const EDIT_LINK_SUCCESS = 'EDIT_LINK_SUCCESS';
const EDIT_LINK_RESET = 'EDIT_LINK_RESET';
const EDIT_LINK_ERROR = 'EDIT_LINK_ERROR';

const DELETE_LINK_SUCCESS = 'DELETE_LINK_SUCCESS';
const DELETE_LINK_RESET = 'DELETE_LINK_RESET';
const DELETE_LINK_ERROR = 'DELETE_LINK_ERROR';

const LINKS_RECEIVED = 'LINKS_RECEIVED';


const createLink = (linkData) => {
    return dispatch => {
        dispatch({
            type: CREATE_LINK_RESET,
        });

        httpPost('/api/v1/links', { link: linkData })
        .then((data) => {
            dispatch({
                type: CREATE_LINK_SUCCESS,
            });
        }).catch((error) => {
            error.response.json().then((errorJson) => {
                dispatch({
                    type: CREATE_LINK_ERROR,
                    errors: errorJson.errors,
                });
            });
        });
    };
};

const deleteLink = (linkData) => {
    return dispatch => {
        dispatch({
            type: EDIT_LINK_RESET,
        });

        httpDelete(`/api/v1/links/${linkData.id}`)
        .then((data) => {
            dispatch({
                type: DELETE_LINK_SUCCESS,
            });
        }).catch((error) => {
            error.response.json().then((errorJson) => {
                dispatch({
                    type: DELETE_LINK_ERROR,
                    errors: errorJson.errors,
                });
            });
        });
    };
};

const editLink = (linkData) => {
    return dispatch => {
        dispatch({
            type: EDIT_LINK_RESET,
        });

        httpPut(`/api/v1/links/${linkData.id}`, { link: linkData })
        .then((data) => {
            dispatch({
                type: EDIT_LINK_SUCCESS,
            });
        }).catch((error) => {
            error.response.json().then((errorJson) => {
                dispatch({
                    type: EDIT_LINK_ERROR,
                    errors: errorJson.errors,
                });
            });
        });
    };
};

const receiveLinks = (category, data, options = { invalidate: false }) => {
    return {
        type: LINKS_RECEIVED,
        links: data.body,
        meta: data.meta,
        receivedAt: Date.now(),
        category,
        invalidate: options.invalidate,
    };
};

const fetchLatestLinks = () => {
    return (dispatch, getState) => {
        httpGet('/api/v1/links', { limit: 20 })
        .then((data) => {
            dispatch(receiveLinks('links:latest', data, { invalidate: true }));
        }).catch((error) => {
            console.log(error);
        });
    };
};

const fetchMoreLatestLinks = () => {
    return (dispatch, getState) => {
        const categoryState = getState().linksByCategory['links:latest'];
        const url = categoryState.next;

        httpGet(url)
        .then((data) => {
            dispatch(receiveLinks('links:latest', data));
        }).catch((error) => {
            console.log(error);
        });
    };
};

const fetchUserLinks = (username) => {
    return (dispatch, getState) => {
        httpGet('/api/v1/links', { username, limit: 20})
        .then((data) => {
            dispatch(receiveLinks(`links:${username}`, data, { invalidate: true }));
        }).catch((error) => {
            console.log(error);
        });
    };
};

const fetchMoreUserLinks = (username) => {
    return (dispatch, getState) => {
        const categoryState = getState().linksByCategory[`links:${username}`];
        const url = categoryState.next;

        httpGet(url)
        .then((data) => {
            dispatch(receiveLinks(`links:${username}`, data));
        }).catch((error) => {
            console.log(error);
        });
    };
};

export {
    CREATE_LINK_SUCCESS,
    CREATE_LINK_RESET,
    CREATE_LINK_ERROR,
    EDIT_LINK_SUCCESS,
    EDIT_LINK_RESET,
    EDIT_LINK_ERROR,
    DELETE_LINK_SUCCESS,
    DELETE_LINK_RESET,
    DELETE_LINK_ERROR,
    LINKS_RECEIVED,

    fetchUserLinks,
    fetchMoreUserLinks,
    fetchLatestLinks,
    fetchMoreLatestLinks,
    createLink,
    editLink,
    deleteLink,
};
