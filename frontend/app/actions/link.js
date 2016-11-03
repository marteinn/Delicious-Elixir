import { httpGet, httpPost } from '../utils/http';

const LINKS_RECEIVED = 'LINKS_RECEIVED';

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
}

export {
    LINKS_RECEIVED,
    fetchLinks,
}
