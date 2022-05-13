module.exports = (error, req, res, next) => {
    error.message && !error.errorCode && console.log(error);
    const statusCode = error.statusCode || 500;
    const errorCode =
        (error.errorCode && error.errorCode.toUpperCase().replace(/[ ]/g, "_")) || "SERVER_ERROR";
    const data = error.data || [];
    res.status(statusCode).json({ errorCode, data });
};
