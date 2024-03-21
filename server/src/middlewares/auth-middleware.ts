import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-errors";
import tokenService from "../service/token-service";
import { JwtPayload } from "jsonwebtoken"

interface CustomRequest extends Request {
    user: string | JwtPayload;
   }


export default function authMiddleware(req: Request, res: Response,next: NextFunction){
    try {
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader) {
            return next(ApiError.UnauthorizedErrors())     
        }

        const accessToken = authorizationHeader.split(' ')[1]
        if(!accessToken) {
            return next(ApiError.UnauthorizedErrors())     
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            return next(ApiError.UnauthorizedErrors())  
        }
        (req as CustomRequest).user = userData
        next()
    } catch(e) {
        return next(ApiError.UnauthorizedErrors())
    }
}