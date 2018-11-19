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

let i = 0;
let j = 0;
/* REST GET TRY 2 */
let interVal2 = setInterval(function () {
    let isThereAnError;
    console.log("----------------------------- InterVal2 -----------------------------");
    for(let retry = 0; retry <= retryAttempts; retry++) {
        console.log("Inside FOR isThereAnError: " + isThereAnError + ", Iteration: " + retry);
        let interVal3 = setInterval(function() {
            requested = request.get({
                url: apiEndpoint,
                json: true
            }, (err, res, body) => {
                if(res.statusCode != 200) {
                    //for(let retry = 0; retry <= retryAttempts; retry++) {
                        try{
                            console.log("Inside TRY isThereAnError: " + isThereAnError + ", Iteration: " + retry);
                            customRetry(err, res);
                            console.log("potentialErr: ", err);
                        }
                        catch (err) {
                            //if(retry === retryAttempts-1){
                                console.log("Inside CATCH isThereAnError: " + isThereAnError + ", Iteration: " + retry);
                                setTimeout(function(){ console.log("breakTimes"); }, 3000);
                                isThereAnError = true;
                                return console.log("Error found: ", err);
                            //}
                        }
                    //}
                }
                if (err===null) {
                    console.log("res code: ", res.statusCode); //Response code from the server (Sockets etc)
                    console.log("Body: ", body); //Information about what is contained in the link
                    isThereAnError = err;
                    //break;
                    //requested.abort();
                    return body;
                }
                
                if(!isThereAnError){
                    retry=retryAttempts;
                } else {
                    requested.abort();
                }
                //break;
            });
            console.log("Inside FOR, after TRY-CATCH isThereAnError: " + isThereAnError + ", Iteration: " + retry);
            if(isThereAnError === undefined){
                break;
            };
            console.log("j: ", j);
            j++;
            if (j === 2) {
                clearInterval(interVal3);
            }
        }, 3000);
    }

    i++;
    if (i === 2) {
        clearInterval(interVal2);
    }

    function customRetry(err, res) {
        console.log("custom retry");
        if (err || res.statusCode === 404) {
            console.log("err || res.statusCode === 404: ", err || res.statusCode === 404);
            isThereAnError = true;
            throw "Glupo sranje ne radi";
        } else {
            console.log("status code not 404?");
            isThereAnError = false;
            return isThereAnError;
        }
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