const helper = require('./helper');
const requestRetry = require('requestretry');

const configuration = require('../../config/config');
const apiEndpoint = configuration.data.linkGet;
const retryAttempts = configuration.data.retryAttempts;
const delayBetweenAttempts = configuration.data.delayBetweenAttempts;
const workerTime = configuration.data.workerTimer;

console.log('+++++++++++c++++++++++++++++++++++++++++++++++');
console.log("sConfig: ", configuration.data);
console.log('+++++++++++++++++++++++++++++++++++++++++++++');

/* REST API - GET */
let i = 0;
let interVal = setInterval(function () {
    console.log('******************************************************');
    console.log('Iteration no. ', i);

    requestRetry({
        url: apiEndpoint,
        json: true,
        maxAttempts: retryAttempts,
        retryDelay: delayBetweenAttempts,
        retryStrategy: helper.myRetryStrategy
    }, (err, res, body) => {
        error = helper.myRetryStrategy(err, res, body);
        if (error) {
            return console.log("In if: ", error);
        }
        if (res) {
            console.log('The number of request attempts: ', res.attempts);
            console.log("res code: ", res.statusCode); //Response code from the server (Sockets etc)
            console.log("Body: ", body); //Information about what is contained in the link
            return body;
        }
    });
    i++;
    if (i === 1) {
        clearInterval(interVal);
    }
}, workerTime);

const postEndpoint = configuration.data.linkPost;
/* REST API - POST */
requestRetry.post({
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: postEndpoint,
    body: "mes=heydude"
}, function (error, response, body) {
    if (error) {
        console.log(error);
        return error;
    };
    console.log('statusCode: ', response.statusCode);
    console.log('body', body);
});
