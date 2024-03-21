"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authRepositories_1 = require("../authRepositories/authRepositories");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/registration');
exports.authRouter.post('/login');
exports.authRouter.post('/logout');
exports.authRouter.get('/activate/:link');
exports.authRouter.get('/refresh');
exports.authRouter.get('/users', authRepositories_1.authRepositories.getUsers);