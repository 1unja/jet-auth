import { Document, Model } from "mongoose"

export interface IUser {
    email: string
    password: string
    isActivated: boolean
    activationLink: string
}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {
    buildRole(args: IUser): IUserDocument
}