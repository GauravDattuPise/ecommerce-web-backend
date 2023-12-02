const userModel = require("../models/user-model")

// create user
exports.registerUser = async (user) => {
    return await userModel.create(user)
}

// check email already exists
exports.checkEmail = async (email) => {
    return await userModel.findOne({email})
}