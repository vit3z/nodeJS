const helper = require('./helper');
const requestRetry = require('requestretry');
let config = require('config');

const data = config.get('configuration');

const apiEndpoint = data.linkGet;
const retryAttempts = data.retryAttempts;
const delayBetweenAttempts = data.delayBetweenAttempts;

/* REST API - GET */
requestRetry({
    url: apiEndpoint,
    json: true,
    maxAttempts: retryAttempts,
    retryDelay: delayBetweenAttempts,
    retryStrategy: helper.myRetryStrategy
}, (err, res, body) => {
    let error = helper.myRetryStrategy(err, res, body);
    if (error) {
        return console.log('In if: ', error);
    }
    if (res) {
        console.log('The number of request attempts: ', res.attempts);
        console.log('res code: ', res.statusCode); //Response code from the server (Sockets etc)
        console.log('Body: ', body); //Information about what is contained in the link
        return body;
    }
});

const postEndpoint = data.linkPost;
/* REST API - POST */
requestRetry.post({
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: postEndpoint,
    body: 'mes=heydude'
}, function (error, response, body) {
    if (error) {
        console.log(error);
        return error;
    }
    console.log('statusCode: ', response.statusCode);
    console.log('body', body);
});
