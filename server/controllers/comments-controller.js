const ApiError = require("../exceptions/ApiError");
const Comments = require("../models/Comments");
const Posts = require("../models/posts");

class CommentsController {
    async addComment(req, res, next) {
        try {
            const comment = await Comments.create({...req.comment}, {
                include:  [
                    {model: Posts}
                ]
            }); //safe after comment-middleware
            res.status(200).json({status: true, comment})
        } catch(e) {
            next(e); //gives e to error-middleware
        }
    }
    async getComment(req, res, next) {
        try {
            // TODO: прибрался сам чуть-чуть;
            if (!req || !req.params) {
                throw ApiError.BadRequest("Статья не найдена");
            }

            const { id, commid } = req.params
            const post = await Posts.findByPk(id);

            if (!post) {
                throw ApiError.BadRequest("Статья не найдена");
            }

            const comment = await Comments.findByPk(commid, {
                include:  [
                    {model: Posts}
                ]
            });

            if (!comment || (comment.post_id !== post.id)) {
                throw ApiError.BadRequest("Комментарий не найден");
            }

            res.status(200).json({status: true, comment})
        } catch(e) {
            next(e);
        }
    }
    async getComments(req, res, next) {
        try {
            // TODO: сделать проверку на существование id + существование req и params;
            const id = req.params.id;
            const comments = await Comments.findAll({
                where: {
                    post_id: id
                },
                include:  [
                    {model: Posts}
                ],
                order: [["createdAt", "DESC"]]
            });
            res.status(200).json({status: true, comments})
        } catch(e) {
            next(e);
        }
    }
    async editComment(req, res, next) {
        try {
            // TODO: заменить на const { id, commid } = req.params;
            const id = req.params.id;
            const commid = req.params.commid;
            const comment = await Comments.update({...req.comment}, {
                where: {
                    id: commid,
                    post_id: id
                }
            });

            // TODO: !comment.length
            if(!comment[0])
                throw ApiError.BadRequest("Комментарий не найден");
            res.status(200).json({status: true})
        } catch(e) {
            next(e);
        }
    }
    async deleteComment(req, res, next) {
        try {
            // TODO: заменить на const { id, commid } = req.params;
            const id = req.params.id;
            const commid = req.params.commid;
            if(!id)
                throw ApiError.BadRequest("Комментарий не найден");
            const comment = await Comments.destroy({
                where: {
                    id: commid,
                    post_id: id
                }
            });
            // TODO: !comment.length
            if(!comment)
                throw ApiError.BadRequest("Комментарий не найден");
            res.status(200).json({status: true})
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new CommentsController()