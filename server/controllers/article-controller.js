const ApiError = require("../exceptions/ApiError");
const Posts = require("../models/posts");

class ArticleController {
    async addArticle(req, res, next) {
        try {
            const post = await Posts.create({...req.article}); //safe after article-middleware
            res.status(200).json({status: true, post})
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
    async editArticle(req, res, next) {
        try {
            const id = req.params.id;
            if(!id)
                throw ApiError.BadRequest("Статья не найдена");
            const post = await Posts.update({...req.article}, {
                where: {
                    id: id
                }
            });
            if(!post[0])
                throw ApiError.BadRequest("Статья не найдена");
            res.status(200).json({status: true})
        } catch(e) {
            next(e);
        }
    }
    async deleteArticle(req, res, next) {
        try {
            const id = req.params.id;
            if(!id)
                throw ApiError.BadRequest("Статья не найдена");
            const post = await Posts.destroy({
                where: {
                    id: id
                }
            });
            if(!post)
                throw ApiError.BadRequest("Статья не найдена");
            res.status(200).json({status: true})
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new ArticleController()