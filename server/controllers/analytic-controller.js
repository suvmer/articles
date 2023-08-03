const { Op } = require("sequelize");
const Comments = require("../models/Comments");
const ApiError = require("../exceptions/ApiError");
const Posts = require("../models/Posts");

class AnalyticController {
    async getComments(req, res, next) {
        try {
            if(!req.query.dateFrom || !req.query.dateTo)
                throw ApiError.BadRequest("Некорректный запрос");
            const comments = await Comments.findAll({
                where: {
                    createdAt: {
                        [Op.gte]: new Date(+req.query.dateFrom),
                        [Op.lte]: new Date(+req.query.dateTo)
                    },
                },
                include:  [
                    {model: Posts}
                ],
                order: [["post_id", "ASC"]]
            });
            res.status(200).json({status: true, comments})
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new AnalyticController()