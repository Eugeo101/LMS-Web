const { $, throwError } = require("./simpleValidators");
const { body } = require("express-validator");

/**
 * Validate text field
 * @param {Options} options
 */

module.exports = (options = {}) => {
    let { fieldName, min, lowercase, uppercase, digits, specialChars, confirm } = options;

    fieldName = fieldName || "password";
    min = min || 6;
    lowercase = lowercase === undefined || lowercase;
    uppercase = uppercase === undefined || uppercase;
    digits = digits === undefined || digits;

    const messages = {
        min: `password should be ${min} characters at least`,
        lowercase: `password should include at least one lowercase letter`,
        uppercase: `password should include at least one uppercase letter`,
        digits: `password should include at least one digit`,
        specialChars: `password should include at least one special character`,
        confirm: `password and confirm password don't match`,
    };

    return body(fieldName).custom((password, { req }) => {
        min && password.lengh < min && throwError(messages.min);
        lowercase && !$(password).haveLowerCase() && throwError(messages.lowercase);
        uppercase && !$(password).haveUpperCase() && throwError(messages.uppercase);
        digits && !$(password).haveDigits() && throwError(messages.digits);
        specialChars && !$(password).haveSpecialCh() && throwError(messages.specialChars);
        confirm && req.body[confirm] !== password && throwError(messages.confirm);

        return true;
    });
};

//    let { fieldName, min, lowercase, uppercase, digits, specialChars, confirm } = options;

/**
 * @typedef {Object} Options
 * @property {string} [fieldName=password] - Field name in the request (default = password)
 * @property {number} [min] - Minimum length for the password (default = 6)
 * @property {boolean} [lowercase=true] - set wether lowercase letters are required or not (default= true),
 * @property {boolean} [uppercase=true] - set wether uppercase letters are required or not (default= true),
 * @property {boolean} [digits=true] - set wether digits are required or not (default= true),
 * @property {boolean} [specialChars=false] - set wether special characters are required or not (default= false),
 * @property {string} [confirm] - Field name of confirmed password in the request
 */
