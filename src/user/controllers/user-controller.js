const jwt = require("jsonwebtoken")

const HttpError = require("../../httpError/http-error")
const userService = require("../services/user-service")
const validate = require("../validations/validator")
const { hashPassword, matchPassword } = require("../helper/helper")


// user register
const registerUser = async (req, res, next) => {
    try {
        const userData = req.body
        let { name, email, password, role } = userData

        // validations

        // name
        if (!name || name.trim() === "") {
            return next(new HttpError("name is required", 400))
        }
        name = userData.name.trim()
        if (!validate.validateName(name)) {
            return next(new HttpError("name can contains alphabets only", 400))
        }

        // email
        if (!email || email.trim() === "") {
            return next(new HttpError("email is required", 400))
        }
        email = userData.email.trim()
        if (!validate.validateEmail(email)) {
            return next(new HttpError("email is not valid", 400))
        }

        // passsword
        if (!password || password.trim() === "") {
            return next(new HttpError("password is required", 400))
        }
        password = userData.password.trim()
        if (!validate.validatePassword(password)) {
            return next(new HttpError("password is weak, provide strong password (eg. Pass123@)", 400))
        }
        
        if (role) {
            if (role !== "regular" && role !== "admin") {
                return next(new HttpError("role is invalid", 400))
            }
        }

        // check email already exists
        const checkEmail = await userService.checkEmail(email)
        if (checkEmail) {
            return next(new HttpError("Email already registerd, Please login", 409))
        }

        // hash password
        userData.password = await hashPassword(password)

        const registerdUser = await userService.registerUser(userData);
        return res.status(201).send({ success: true, message: "registration successfull", user: registerdUser })

    } catch (error) {
        console.log("server error is", error.message)
        next(new HttpError("server error in register user", 500))
    }
}


// user login
const loginUser = async (req, res, next) => {
    try {
        const userData = req.body
        const { email, password } = userData

        // validations

        if (!email) {
            return next(new HttpError("email is required", 400))
        }
        if (!password) {
            return next(new HttpError("password is required", 400))
        }

        // check email exists or not
        const checkUser = await userService.checkEmail(email)
        if (!checkUser) {
            return next(new HttpError("email not found, Please register", 404))
        }

        const matchedPassword = await matchPassword(password, checkUser.password)
        if (!matchedPassword) {
            return next(new HttpError("password is wrong", 400))
        }

        const token = jwt.sign({ userId: checkUser._id }, process.env.SECRET_KEY, { expiresIn: "7d" })
        res.setHeader("token", token)
        return res.status(200).send({ success: true, message: "login successfull", token })

    } catch (error) {
        next(new HttpError("server error in login user", 500))
    }
}


module.exports = { registerUser, loginUser }