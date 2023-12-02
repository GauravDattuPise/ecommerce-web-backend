const jwt = require("jsonwebtoken")
const HttpError = require("../httpError/http-error")

exports.authentication = async (req, res, next) => {
    try {

        const token = req.headers["token"]

        if (!token) {
            return next(new HttpError("Token is required, provide token in req headers", 400))
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                const errorMessage = err.message
                return next(new HttpError(errorMessage, 401))
            }

            // making userId globally accssible
            req.userId = decodedToken.userId

            next();
        })

    } catch (error) {
        console.log(error.message)
        next(new HttpError("server error in authentication", 500))
    }
}
