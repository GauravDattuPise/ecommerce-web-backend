
class HttpError extends Error{
    constructor(message, errorCode){
        super(message)          // set message to error object
        this.code = errorCode;  // status code to error object
    }
}

module.exports = HttpError