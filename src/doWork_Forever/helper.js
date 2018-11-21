/* Custom retry method */
function customRetry(err, res, retry) {
    console.log('');
    console.log('Retry no. ', retry);
    if (err || res.statusCode === 404) {
        throw 'Glupo sranje ne radi';
    } else {
        let isThereAnError = false;
        return isThereAnError;
    }
}

module.exports.customRetry = customRetry;