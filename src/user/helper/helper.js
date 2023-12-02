
const bcrypt = require("bcrypt");

// hash password
exports.hashPassword = (password) => {
    return bcrypt.hash(password, 10);
}

// compare password
exports.matchPassword = (password, bcrytedPassword) => {
    return bcrypt.compare(password, bcrytedPassword);
}