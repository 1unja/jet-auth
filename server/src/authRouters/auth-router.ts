import { Router, Request, Response } from "express";
import { authRepositories } from "../authController/auth-controller";
import {body} from 'express-validator'
import authMiddleware from "../middlewares/auth-middleware";

export const authRouter = Router()

authRouter.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    authRepositories.registerUser)
authRouter.post('/login', authRepositories.loginUser)
authRouter.post('/logout', authRepositories.logoutUser)
authRouter.get('/activate/:link', authRepositories.acitvateUser)
authRouter.get('/refresh', authRepositories.refreshUser)
authRouter.get('/users', authMiddleware, authRepositories.getUsers)