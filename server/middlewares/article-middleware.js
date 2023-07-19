const ApiError = require("../exceptions/ApiError");

module.exports = function(req, res, next) {
    try {
        if(!req.body.title || !req.body.body)
            throw ApiError.BadRequest("Некорректное название или содержание статьи");
        var [title, body] = [req.body.title.trim(), req.body.body.trim()];
        if(!title || !body)
            throw ApiError.BadRequest("Некорректное название или содержание статьи");
        req.article = {title, body};
        next();
    } catch(e) {
        next(e);
    }
}