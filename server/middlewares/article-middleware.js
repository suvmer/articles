const ApiError = require("../exceptions/ApiError");

module.exports = function(req, res, next) {
    try {
        console.log(req.body.title, req.body.body);
        next();
    } catch(e) {
        next(e);
    }
}