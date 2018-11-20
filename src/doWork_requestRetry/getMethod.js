const requestRetry = require('requestretry');

const configuration = require('../../config/config');
const apiEndpoint = configuration.secretConfig.linkGet;
const retryAttempts = configuration.secretConfig.retryAttempts;
const delayBetweenAttempts = configuration.secretConfig.delayBetweenAttempts;
const workerTime = configuration.secretConfig.workerTimer;

console.log('+++++++++++c++++++++++++++++++++++++++++++++++');
console.log("sConfig: ", configuration.secretConfig);
console.log('+++++++++++++++++++++++++++++++++++++++++++++');

/* REST API - GET */
let i = 0;
let interVal = setInterval(function () {
    console.log('******************************************************');
    console.log('Iteration no. ', i);
    function myRetryStrategy(err, res, body) {
        console.log('URL: ', apiEndpoint);
        //console.log('url: ', body);
        console.log('res: ', res.statusCode);

        if (err || res.statusCode === 404) {
            console.log("err || res.statusCode === 404: ", err || res.statusCode === 404);
            return new Error("Glupo sranje ne radi");
        } else {
            console.log("status code not 404?");
            return null;
        }
    }

    requestRetry({
        url: apiEndpoint,
        json: true,
        maxAttempts: retryAttempts,
        retryDelay: delayBetweenAttempts,
        retryStrategy: myRetryStrategy
    }, (err, res, body) => {
        error = myRetryStrategy(err, res, body);
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
