import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

const parseJSON = response => response.json();

const parseResponseHeaders = response => {
    return new Promise((resolve, reject) => {
        let headers = {};
        let whitelist = ['next', 'prev', 'link'];
        let entries = Array.from(response.headers.entries());

        entries = entries.filter(([key, value]) =>
            whitelist.includes(key)
        );
        entries.map(([key, value]) => {
            headers[key] = value;
        });

        return resolve(headers);
    });
}

const parseResponse = response => {
    return new Promise((resolve, reject) => {
        Promise.all([
            parseResponseHeaders(response),
            parseJSON(response),
        ]).then((data) => {
            let [ meta, body ] = data;

            return resolve(Object.assign(
                { meta: meta },
                { body: body },
            ));
        });
    });
}

const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

const buildHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        ...defaultHeaders,
        Authorization: token,
    };
};

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
};


const httpGet = url => (
    fetch(url, {
        headers: buildHeaders(),
    })
    .then(checkStatus)
    .then(parseResponse)
);

const httpPost = (url, data) => (
    fetch(url, {
        method: 'post',
        headers: buildHeaders(),
        body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then(parseResponse)
);

export {
    httpGet,
    httpPost,
};

