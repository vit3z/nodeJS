let requestRetry = require('requestretry');
let request = require('request');

const configuration = require('./config/config.js');

/**
 * @param  {Null | Object} err
 * @param  {Object} res 
 * @param  {Object} body 
 * @return {Boolean} true if the request should be retried
 */

console.log('Process.env.port: ', process.env.port);

let apiEndpoint = configuration.secretConfig.linkGet;
let postEndpoint = configuration.secretConfig.linkPost;
let retryAttempts = configuration.secretConfig.retryAttempts;
let delayBetweenAttempts = configuration.secretConfig.delayBetweenAttempts;
let workerTime = configuration.secretConfig.workerTimer;

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

module.exports = requestRetry;