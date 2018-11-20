const helper = require('./helper');
const request = require('request');
const configuration = require('../../config/config');

const apiEndpoint = configuration.data.linkGet;
const retryAttempts = configuration.data.retryAttempts;
const delayBetweenAttempts = configuration.data.delayBetweenAttempts;
const workerTime = configuration.data.workerTimer;
/* REST GET TRY 2 */
let iterator1 = 0;
while(iterator1 < 1){
    let brokenLink;
    for(let retry = 0; retry < 2; retry++){
        let i = 0;
        //let interVal2 = setInterval(function () {
            requested = request.get({
                url: apiEndpoint,
                json: true
            }, (err, res, body) => {
                if(res.statusCode != 200) {
                    try{
                        helper.customRetry(err, res);
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
    iterator1++;
}

const postEndpoint = configuration.data.linkPost;
/* REST API - POST */
request.post({
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
