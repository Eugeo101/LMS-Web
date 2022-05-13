const jwt = require("jsonwebtoken");

module.exports = (access) => {
    return (req, res, next) => {
        const hasAccess = req.authorization.access == access;
        if (hasAccess) next();
        else {
            const error = {
                ErrorCode: "FORBIDDEN",
                ErrorData: [],
                StatusCode: 403,
            };
            next(error);
        }
    };
};
