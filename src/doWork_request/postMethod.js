const request = require('request');
const configuration = require('../../config/config');

const postEndpoint = configuration.secretConfig.linkPost;
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
