"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../authController/auth-controller");
const express_validator_1 = require("express-validator");
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/registration', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isLength({ min: 3, max: 32 }), auth_controller_1.authRepositories.registerUser);
exports.authRouter.post('/login', auth_controller_1.authRepositories.loginUser);
exports.authRouter.post('/logout', auth_controller_1.authRepositories.logoutUser);
exports.authRouter.get('/activate/:link', auth_controller_1.authRepositories.acitvateUser);
exports.authRouter.get('/refresh', auth_controller_1.authRepositories.refreshUser);
exports.authRouter.get('/users', auth_middleware_1.default, auth_controller_1.authRepositories.getUsers);
