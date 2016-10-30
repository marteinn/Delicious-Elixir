import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

const parseJSON = response => response.json();

const buildHeaders = () => ({
});

const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

const httpGet = url => {
    return fetch(url, {
        headers: buildHeaders()
    }
    .then(checkStatus)
    .then(parseJSON);
}
