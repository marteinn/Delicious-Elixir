import { push } from 'react-router-redux';
import { httpGet, httpPost } from '../utils/http';

const CREATE_LINK_ERROR = 'CREATE_LINK_ERROR';
const LINKS_RECEIVED = 'LINKS_RECEIVED';
const LINKS_INVALIDATE = 'LINKS_INVALIDATE';


const createLink = (linkData) => {
    return dispatch => {
        httpPost('/api/v1/links', { link: linkData })
        .then((data) => {
            dispatch(push(`/users/${data.user.username}`));
        }).catch((error) => {
            error.response.json().then((errorJson) => {
                dispatch({
                    type: CREATE_LINK_ERROR,
                    error: errorJson,
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
}

const fetchUserLinks = (username) => {
    return (dispatch, getState) => {
        httpGet(`/api/v1/links?username=${username}`)
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
}

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
    LINKS_RECEIVED,
    LINKS_INVALIDATE,

    fetchLinks,
    fetchUserLinks,
    fetchMoreUserLinks,
    createLink,
};
