"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user-model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const mail_service_1 = __importDefault(require("./mail-service"));
const user_dto_1 = __importDefault(require("../dtos/user-dto"));
const token_service_1 = __importDefault(require("./token-service"));
const api_errors_1 = __importDefault(require("../exceptions/api-errors"));
class UserService {
    registration(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield user_model_1.default.findOne({ email });
            if (candidate) {
                throw api_errors_1.default.BadRequest(`User with ${email} email is already in the system`);
            }
            const hashPassword = bcrypt_1.default.hashSync(password, 7);
            const activationLink = (0, uuid_1.v4)();
            const user = yield user_model_1.default.create({ email: email, password: hashPassword, activationLink: activationLink });
            yield mail_service_1.default.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
            const userDto = new user_dto_1.default(user);
            const tokens = token_service_1.default.generatetoken(Object.assign({}, userDto));
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    activation(activationLink) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ activationLink });
            if (!user) {
                throw api_errors_1.default.BadRequest('Activation link is incorrect');
            }
            user.isActivated = true;
            yield user.save();
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield user_model_1.default.findOne({ email });
            if (!candidate) {
                throw api_errors_1.default.BadRequest('Not correct data');
            }
            const isPassCorrect = yield bcrypt_1.default.compare(password, candidate.password);
            if (!isPassCorrect) {
                throw api_errors_1.default.BadRequest('Not correct data');
            }
            const userDto = new user_dto_1.default(candidate);
            const tokens = token_service_1.default.generatetoken(Object.assign({}, userDto));
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield token_service_1.default.removeToken(refreshToken);
            return token;
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw api_errors_1.default.UnauthorizedErrors();
            }
            const userData = token_service_1.default.validateRefreshToken(refreshToken);
            const tokenFromDb = yield token_service_1.default.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw api_errors_1.default.UnauthorizedErrors();
            }
            if (typeof userData !== 'object') {
                throw api_errors_1.default.UnauthorizedErrors();
            }
            const user = yield user_model_1.default.findById(userData.id);
            if (!user) {
                throw api_errors_1.default.UnauthorizedErrors();
            }
            const userDto = new user_dto_1.default(user);
            const tokens = token_service_1.default.generatetoken(Object.assign({}, userDto));
            yield token_service_1.default.saveToken(userDto.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.default.find();
            return users;
        });
    }
}
exports.default = new UserService();
