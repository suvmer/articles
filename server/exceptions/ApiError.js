module.exports = class ApiError extends Error {
    status;

    constructor(status, message) {
        super(message);
        this.status = status;
    }
    
    static BadRequest(message) {
        // TODO: установить модуль http-status-codes и брать статус оттуда (во всех подобных конструкциях)
        return new ApiError(400, message);
    }
    static NotFound(message) {
        // TODO: установить модуль http-status-codes и брать статус оттуда (во всех подобных конструкциях)
        return new ApiError(404, message);
    }
}