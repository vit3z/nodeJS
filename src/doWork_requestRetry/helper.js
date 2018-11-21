
function myRetryStrategy(err, res) {
    if (err || res.statusCode === 404) {
        console.log('err || res.statusCode === 404: ', err || res.statusCode === 404);
        return new Error('Glupo sranje ne radi');
    } else {
        console.log('status code not 404?');
        return null;
    }
}

module.exports.myRetryStrategy = myRetryStrategy;
