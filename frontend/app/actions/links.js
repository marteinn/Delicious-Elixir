import { push } from 'react-router-redux';
import { httpGet, httpPost } from '../utils/http';

const CREATE_LINK_ERROR = 'CREATE_LINK_ERROR';
const CREATE_LINK_SUCCESS = 'CREATE_LINK_SUCCESS';
const CREATE_LINK_RESET = 'CREATE_LINK_RESET';
const LINKS_RECEIVED = 'LINKS_RECEIVED';
const LINKS_INVALIDATE = 'LINKS_INVALIDATE';


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

const receiveLinks = (category, data) => {
    return {
        type: LINKS_RECEIVED,
        links: data.body,
        meta: data.meta,
        receivedAt: Date.now(),
        category,
    };
};

const invalidateLinks = (category) => {
    return {
        type: LINKS_INVALIDATE,
        category,
    };
};

const fetchUserLinks = (username) => {
    return (dispatch, getState) => {
        httpGet(`/api/v1/links?username=${username}&limit=20`)
        .then((data) => {
            dispatch(invalidateLinks(`links:${username}`));
            dispatch(receiveLinks(`links:${username}`, data));
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

const fetchLinks = (params = '', category) => {
    return (dispatch, getState) => {
        httpGet(`/api/v1/links${params}`)
        .then((data) => {
            dispatch(receiveLinks(category, data));
        }).catch((error) => {
            console.log(error);
        });
    };
};

export {
    CREATE_LINK_ERROR,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_RESET,
    LINKS_RECEIVED,
    LINKS_INVALIDATE,

    fetchLinks,
    fetchUserLinks,
    fetchMoreUserLinks,
    createLink,
};
