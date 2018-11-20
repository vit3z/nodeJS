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

module.exports.customRetry = customRetry;