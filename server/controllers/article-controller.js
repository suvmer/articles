const ApiError = require("../exceptions/ApiError");
const Posts = require("../models/posts");

class ArticleController {
    async addArticle(req, res, next) {
        try {
            const posts = await Posts.findAll();
            res.status(200).json({status: true, posts})
        } catch(e) {
            next(e); //gives e to error-middleware
        }
    }
    async getArticle(req, res, next) {
        try {
            const id = req.params.id;
            const post = await Posts.findByPk(id);
            if(post === null)
                throw ApiError.BadRequest("Статья не найдена");
            /*await Posts.create({
                title: "Boba",
                body: "Aboba"
            });*/
            res.status(200).json({status: true, post})
        } catch(e) {
            next(e);
        }
    }
    async getArticles(req, res, next) {
        try {
            const posts = await Posts.findAll();
            res.status(200).json({status: true, posts})
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new ArticleController()