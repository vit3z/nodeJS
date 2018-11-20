 /* Custom retry method */
 function customRetry(err, res, retry) {
    console.log("")
    console.log("Retry no. ", retry);
    if (err || res.statusCode === 404) {
        isThereAnError = true;
        throw "Glupo sranje ne radi";
    } else {
        isThereAnError = false;
        return isThereAnError;
    }
}

module.exports.customRetry = customRetry;