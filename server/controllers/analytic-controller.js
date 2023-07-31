const { Op } = require("sequelize");
const Comments = require("../models/Comments");
const ApiError = require("../exceptions/ApiError");
const Posts = require("../models/posts");

class AnalyticController {
    async getComments(req, res, next) {
        try {
            // TODO: сделать проверку на существование req и req.query req?.query?.dateFrom
            // TODO: Req.query.dateFrom, dateTo вынести в переменные
            if(!req.query.dateFrom || !req.query.dateTo)
                // TODO: вынести текстовые значения метода BadRequest в отдельный файл (во всех подобных конструкциях)
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
            // TODO: установить модуль http-status-codes и брать статус оттуда (во всех подобных конструкциях)
            res.status(200).json({status: true, comments})
        } catch(e) {
            // TODO: добавить логирование logger.debug(`Failed to get comments ${e}`) (во всех подобных конструкциях)
            // TODO: подробнее в файле "Общие пожелания".
            next(e);
        }
    }
}

module.exports = new AnalyticController()