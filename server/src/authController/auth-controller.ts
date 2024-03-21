import { Request, Response, NextFunction } from "express";
import userService from "../service/user-service";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-errors";


export const authRepositories = {
    async getUsers(req: Request, res: Response, next: NextFunction ) {
        try {
            const users = await userService.getAllUsers()
            res.json(users)
        } catch(e) {
            next(e)
        }
    },
    async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const validateErrors = validationResult(req)
            if(!validateErrors.isEmpty()) {
                return next(ApiError.BadRequest('Validation errors', validateErrors.array()))
            }

            const {email, password} = req.body

            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e) {
            next(e)
        }
    },
    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body

            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e) {
            next(e)
        }
    },
    async logoutUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.json(token)
        } catch(e) {
            next(e)
        }
    },
    async acitvateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link
            await userService.activation(activationLink)
            return res.redirect(`${process.env.CLIENT_URL}`)
        } catch(e) {
            next(e)
        }
    },
    async refreshUser(req: Request, res: Response, next: NextFunction) {
        try {
            const {refreshToken} = req.cookies

            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch(e) {
            next(e)
        }
    },
}