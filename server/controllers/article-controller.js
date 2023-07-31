const ApiError = require("../exceptions/ApiError");
const Comments = require("../models/Comments");
const Posts = require("../models/posts");

class ArticleController {
    async addArticle(req, res, next) {
        try {
            // TODO: поменять var на const
            var post = await Posts.create({...req.article}, {
                include:  [{
                    model: Comments,
                    as: 'comments',
                    order: [["createdAt", 'DESC']],
                    separate: true
                }]
            }); //safe after article-middleware
            res.status(200).json({status: true, post: {...post.dataValues, comments: []}})
        } catch(e) {
            next(e); //gives e to error-middleware
        }
    }
    async getArticle(req, res, next) {
        try {
            // TODO: сделать проверку на существование id + существование req и params;
            const id = req.params.id;
            const post = await Posts.findByPk(id,{
                include:  [{
                    model: Comments,
                    as: 'comments',
                    order: [["createdAt", 'DESC']],
                    separate: true
                }]
            });

            if (!post)
                throw ApiError.BadRequest("Статья не найдена");
            res.status(200).json({status: true, post})
        } catch(e) {
            next(e);
        }
    }
    async getArticles(req, res, next) {
        try {
            const posts = await Posts.findAll({
                order: [["createdAt", "DESC"]],
                include:  [{
                    model: Comments,
                    as: 'comments',
                    order: [["createdAt", 'DESC']],
                    separate: true
                }]
            });
            res.status(200).json({status: true, posts})
        } catch(e) {
            next(e);
        }
    }
    async editArticle(req, res, next) {
        try {
            // TODO: сделать проверку на существование id + существование req и params;
            const id = req.params.id;
            if(!id)
                throw ApiError.BadRequest("Статья не найдена");
            const post = await Posts.update({...req.article}, {
                where: {
                    id: id
                }
            });
            if(!post || !post.length)
                throw ApiError.BadRequest("Статья не найдена");
            res.status(200).json({status: true})
        } catch(e) {
            next(e);
        }
    }
    async deleteArticle(req, res, next) {
        try {
            // TODO: сделать проверку на существование id + существование req и params;
            const id = req.params.id;
            if(!id)
                throw ApiError.BadRequest("Статья не найдена");
            const post = await Posts.destroy({
                where: {
                    id: id
                }
            });
            await Comments.destroy({
                where: {
                    post_id: id
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