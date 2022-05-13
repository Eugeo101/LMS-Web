const { $, throwError } = require("./simpleValidators");
const { body } = require("express-validator");

/**
 * Validate text field
 * @param {Options} options
 */
module.exports = (options = {}) => {
    let { fieldName, required, min, max, specialChars, escape } = options;

    required = required === undefined || required;
    escape = escape === undefined || escape;
    const except = Array.isArray(specialChars) ? specialChars : [];

    const messages = {
        required: `${fieldName} is required`,
        min: `${fieldName} should be ${min} characters at least`,
        max: `${fieldName} should be ${max} characters at most`,
        specialChars: `${fieldName} should not include special characters`,
    };
    const check = body(fieldName).custom((value) => {
        required && !value && throwError(messages.required);
        min && value.length < min && throwError(messages.min);
        max && value.length > min && throwError(messages.max);
        !specialChars && $(value).haveSpecialCh(except) && throwError(messages.specialChars);

        return true;
    });
    return escape ? check.escape() : check;
};

/**
 * @typedef {Object} Options
 * @property {string} fieldName - Field name in the request
 * @property {boolean} [required=true] - Is the field required (default = true)
 * @property {number} [min] - Minimum length, if not set field won't have minimum limit
 * @property {number} [max] - Maximum length, if not set field won't have maximum limit
 * @property {boolean|string[]} [specialChars=false] - set wether special characters are allowed or not (default= false),
 * you can it give it an array of special characters allowed or set it to true to allow all special characters
 * @property {boolean} [escape=true] - Escape text or not, used to protect against XSS attacks (default = true),
 * DON'T USE ON PASSWORDS
 */
