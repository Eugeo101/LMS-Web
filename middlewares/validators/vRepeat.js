const { throwError } = require("./simpleValidators");
const { body } = require("express-validator");
const { Model: M } = require("mongoose");
/**
 * Validate text field
 * @param {Options} options
 */

module.exports = (options = {}) => {
    let { fieldName, Model, modelFieldName, shouldExist, message } = options;

    modelFieldName = modelFieldName || fieldName;

    const messages = {
        shouldExist: message || `${fieldName} doesn't exist`,
        shouldNotExist: message || `${fieldName} already exists`,
    };

    return body(fieldName).custom(async (value) => {
        const exists = await Model.findOne({ [modelFieldName]: value });

        shouldExist && !exists && throwError(messages.shouldExist);
        !shouldExist && exists && throwError(messages.shouldNotExist);

        return true;
    });
};
