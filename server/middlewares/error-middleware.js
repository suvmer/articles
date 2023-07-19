const ApiError = require("../exceptions/ApiError");

module.exports = function(err, req, res, next) {
    console.log(err)
    if(err instanceof ApiError)
        return res.status(err.status).json({status: false, message: err.message});
    return res.status(500).json({status: false, message: "Неизвестная ошибка"});
}