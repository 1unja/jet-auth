import User from "../models/user-model"
import bcrypt from 'bcrypt'
import { v4 as uuidv4} from 'uuid'
import mailService from "./mail-service"
import UserDto from "../dtos/user-dto"
import tokenService from "./token-service"
import ApiError from "../exceptions/api-errors"
import { JwtPayload } from "jsonwebtoken"

class UserService {
    async registration(email: string, password: string) {
        const candidate = await User.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`User with ${email} email is already in the system`)
        }
        const hashPassword = bcrypt.hashSync(password, 7)
        const activationLink = uuidv4()
        const user = await User.create({email: email, password: hashPassword, activationLink: activationLink})
        await mailService.sendActivationMail(email,`${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generatetoken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        
        return {
            ...tokens,
            user: userDto
        }
    }
    async activation(activationLink: string) {
        const user = await User.findOne({activationLink})
        if(!user) {
            throw ApiError.BadRequest('Activation link is incorrect')
        }
        user.isActivated = true
        await user.save()
    }
    async login(email: string, password: string){
        const candidate = await User.findOne({email})
        if(!candidate) {
            throw ApiError.BadRequest('Not correct data')
        }
        const isPassCorrect = await bcrypt.compare(password, candidate.password)
        if(!isPassCorrect) {
            throw ApiError.BadRequest('Not correct data')
        }

        const userDto = new UserDto(candidate)
        const tokens = tokenService.generatetoken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        
        return {
            ...tokens,
            user: userDto
        }

    }
    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken: string) {
        if(!refreshToken) {
            throw ApiError.UnauthorizedErrors()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedErrors()
        }
        if(typeof userData !== 'object'){
            throw ApiError.UnauthorizedErrors()
        }
        const user = await User.findById(userData.id)
        if(!user) {
            throw ApiError.UnauthorizedErrors()
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generatetoken({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers(){
        const users = await User.find()
        return users
    }
}

export default new UserService()