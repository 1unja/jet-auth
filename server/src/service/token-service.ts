import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import TokenModel from "../models/token-model"
dotenv.config()

class TokenService {
    generatetoken(payload: Object) {
        const accessToken = jwt.sign(payload, `${process.env.JWT_ACCESS_SECRET}`, {expiresIn: '15m'})
        const refreshToken = jwt.sign(payload, `${process.env.JWT_REFRESH_SECRET}`, {expiresIn: '30d'})
        return {accessToken,
                refreshToken}
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, `${process.env.JWT_ACCESS_SECRET}`)
            return userData
        } catch(e) {
            return null
        }
    }

    validateRefreshToken(token: string){
        try {
            const userData = jwt.verify(token, `${process.env.JWT_REFRESH_SECRET}`)
            return userData
        } catch(e) {
            return null
        }
    }

    async saveToken(userId: Object , refreshToken: string) {
        const tokenData = await TokenModel.findOne({userId: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const createToken = await TokenModel.create({userId: userId, refreshToken: refreshToken})
        return createToken.save()
    }

    async removeToken(refreshToken: string) {
        const tokenData = await TokenModel.deleteOne({refreshToken})
        return tokenData
    }

    async findToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne({refreshToken})
        return tokenData
    }
}

export default new TokenService