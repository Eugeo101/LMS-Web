const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error();
            error.status = 400;
            error.code = "DATA_INVALID";
            error.data = [...errors.errors];
            throw error;
        }
    } catch (err) {
        next(err);
    }
};
