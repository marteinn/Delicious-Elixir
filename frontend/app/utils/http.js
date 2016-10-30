import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

const parseJSON = response => response.json();

const buildHeaders = () => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
});

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
};


const httpGet = (url) => (
    fetch(url, {
        headers: buildHeaders(),
    })
    .then(checkStatus)
    .then(parseJSON)
);

const httpPost = (url, data) => (
    fetch(url, {
        method: 'post',
        headers: buildHeaders(),
        body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then(parseJSON)
);

export {
    httpGet,
    httpPost,
};

