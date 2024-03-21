"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_errors_1 = __importDefault(require("../exceptions/api-errors"));
const token_service_1 = __importDefault(require("../service/token-service"));
function authMiddleware(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(api_errors_1.default.UnauthorizedErrors());
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(api_errors_1.default.UnauthorizedErrors());
        }
        const userData = token_service_1.default.validateAccessToken(accessToken);
        if (!userData) {
            return next(api_errors_1.default.UnauthorizedErrors());
        }
        req.user = userData;
        next();
    }
    catch (e) {
        return next(api_errors_1.default.UnauthorizedErrors());
    }
}
exports.default = authMiddleware;
