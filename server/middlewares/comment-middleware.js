const ApiError = require("../exceptions/ApiError");
const Posts = require("../models/posts");

module.exports = async function(req, res, next) {
    try {
        if(!req.body.body)
            throw ApiError.BadRequest("Некорректный текст комментария");
        var body = req.body.body.trim();
        if(!body)
            throw ApiError.BadRequest("Некорректный текст комментария");
        const id = req.params.id;
        const post = await Posts.findByPk(id);
        if(post === null)
            throw ApiError.BadRequest("Статья не найдена");
        req.article = {...post};
        req.comment = {body};
        next();
    } catch(e) {
        next(e);
    }
}