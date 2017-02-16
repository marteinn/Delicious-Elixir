import { httpGet, httpPost, httpPut, httpDelete } from '../utils/http';

const SCRAPE_SUCCESS = 'SCRAPE_SUCCESS';

const scrapeUrl = (url) => {
    return (dispatch, getState) => {
        httpPost('/api/v1/scraper', { url })
        .then((data) => {
            dispatch({
                type: SCRAPE_SUCCESS,
                data: data.body.scraper,
            });
        }).catch((error) => {
            error.response.json().then((errorJson) => {
                //dispatch({
                    //type: CREATE_LINK_ERROR,
                    //errors: errorJson.errors,
                //});
            });
        });
    }
}

export {
    SCRAPE_SUCCESS,

    scrapeUrl,
}
