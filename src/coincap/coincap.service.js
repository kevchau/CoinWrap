/*
    Original CoinCap API passthrough
*/
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

var config = require('./../config');
const baseURL = config.coincap.baseUrl;

exports.passRequest = (endpoint, params) => {
    let url = new URL(`${baseURL}/${endpoint}`);

    if (params) {
        url.search = new URLSearchParams(params);
    }
    
    return fetch(url).then(response => response.json());
};

exports.passRequestPath = (path) => {
    let url = new URL(`${baseURL}${path}`);
    return fetch(url).then(response => response.json());
};