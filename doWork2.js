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

/* REST GET TRY 2 */
let iterator1 = 0;
while(iterator1 < 5){
    let brokenLink;
    for(let retry = 0; retry < retryAttempts; retry++){
        let i = 0;
        //let interVal2 = setInterval(function () {
            requested = request.get({
                url: apiEndpoint,
                json: true
            }, (err, res, body) => {
                if(res.statusCode != 200) {
                        try{
                            customRetry(err, res);
                            console.log("potentialErr: ", err);
                        }
                        catch (err) {
                                console.log("----------------------------- InterVal" + i + " -----------------------------");
                                setTimeout(function(){ console.log("breakTimes"); }, 3000);
                                brokenLink=true;
                                return console.log("Error found: ", err);
                        }
                }
                console.log("For loop: ", retry);
                if (err===null) {
                    console.log("res code: ", res.statusCode); //Response code from the server (Sockets etc)
                    console.log("Body: ", body); //Information about what is contained in the link
                    console.log("----------------------------- InterVal" + i + " -----------------------------");
                    brokenLink=false;
                    //clearInterval(interVal2);
                    return body;
                }
            });
            i++;
            if (i === 5) {
                i = 0;
                //clearInterval(interVal2);
            }
        //}, 10000);
    }
    console.log("brokenLink: ", brokenLink);
    console.log("New interval");
    iterator1++;
}

    
/* Custom retry method */
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