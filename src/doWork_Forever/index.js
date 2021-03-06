const helper = require('./helper');
const request = require('request');
const config = require('config');

const data = config.get('configuration');

/* REST API - GET */
const apiEndpoint = data.linkGet;
const delayBetweenAttempts = data.delayBetweenAttempts;
let retry = 0;

setInterval(function() {
    request.get({
        url: apiEndpoint,
        json: true
    }, (err, res, body) => {
        if(res.statusCode != 200) {
            try{
                helper.customRetry(err, res, retry);
            }
            catch (err) {
                console.log('Iteration no.', retry);
                return console.log('Error found: ', err);
            }
        } else {
            console.log('');
            console.log('Iteration no.', retry);
            console.log('res code: ', res.statusCode); //Response code from the server (Sockets etc)
            console.log('Body: ', body); //Information about what is contained in the link
            return body;
        }
    });
    retry++;
}, delayBetweenAttempts);

/* REST API - POST */
const postEndpoint = data.linkPost;
request.post({
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: postEndpoint,
    body: 'mes=heydude'
}, (error, response, body) => {
    if (error) {
        console.log(error);
        return error;
    } else { 
        console.log('statusCode: ', response.statusCode);
        console.log('body', body);
    }
});
