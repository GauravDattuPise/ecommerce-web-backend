// name regex
const nameRegex = /^[A-Za-z\s]+$/;
exports.validateName = (name) => {
    console.log(name);
    return nameRegex.test(name);
};

// email regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
exports.validateEmail = (email) => {
    return emailRegex.test(email);
};

// password regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
exports.validatePassword = (password) => {
    return passwordRegex.test(password);
};

