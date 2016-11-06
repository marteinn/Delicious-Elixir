import { push } from 'react-router-redux';
import { httpGet, httpPost } from '../utils/http';

const CREATE_LINK_ERROR = 'CREATE_LINK_ERROR';
const LINKS_RECEIVED = 'LINKS_RECEIVED';


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
    }
}

const fetchLinks = () => {
    return dispatch => {
        httpGet('/api/v1/links')
        .then((data) => {
            dispatch({
                type: LINKS_RECEIVED,
                links: data,
            });
        }).catch((error) => {
            /*error.response.json().then((errorJson) => {*/
                //dispatch({
                    //type: SESSION_ERROR,
                    //error: errorJson,
                //});
            /*});*/
        });
    };
};

export {
    LINKS_RECEIVED,
    fetchLinks,
    createLink,
};
