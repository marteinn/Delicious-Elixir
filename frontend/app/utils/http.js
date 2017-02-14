import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';

const parseJSON = response => response.json();

const parseResponseHeaders = response => {
    return new Promise((resolve, reject) => {
        const headers = {};
        const whitelist = ['next', 'prev', 'link'];
        let entries = Array.from(response.headers.entries());

        entries = entries.filter(([key, value]) =>
            whitelist.includes(key)
        );
        entries.forEach(([key, value]) => {
            headers[key] = value;
        });

        return resolve(headers);
    });
};

const parseResponse = response => {
    return new Promise((resolve, reject) => {
        Promise.all([
            parseResponseHeaders(response),
            parseJSON(response),
        ]).then((data) => {
            const [meta, body] = data;

            return resolve(Object.assign(
                { meta },
                { body },
            ));
        });
    });
};

const toQueryParams = (params) => {
    return Object.keys(params)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
};

const appendQueryParams = (url, params) => (
    url + (params ? `?${toQueryParams(params)}` : '')
);

const defaultHeaders = {
    Accept: 'application/json',
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


const httpGet = (url, params) => (
    fetch(appendQueryParams(url, params), {
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

const httpPut = (url, data) => (
    fetch(url, {
        method: 'put',
        headers: buildHeaders(),
        body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then(parseResponse)
);

const httpDelete = url => (
    fetch(url, {
        method: 'delete',
        headers: buildHeaders(),
    })
    .then(checkStatus)
    //.then(parseResponse)
);


export {
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
};
