const { $, throwError } = require("./simpleValidators");
const { body } = require("express-validator");
/**
 * Validate email field
 * @param {Options} options
 */
module.exports = (options = {}) => {
    const fieldName = options.fieldName || "email";
    const allowedDomains = options.allowedDomains;

    const messages = {
        invalid: `Invalid email`,
        allowedDomains: `Allowed domains are ${options.allowedDomains}`,
    };

    return body(fieldName)
        .trim()
        .isEmail()
        .withMessage(messages.invalid)
        .custom((email) => {
            allowedDomains &&
                !$(email).haveSubstr(allowedDomains) &&
                throwError(messages.allowedDomains);

            return true;
        });
};
/**
 * @typedef {Object} Options
 * @property {string} [fieldName=email] - Field name in the request (default = "email")
 * @property {string[]} [allowedDomains] - Allowed domains eg: google, yahoo, outlook, ...etc
 */
