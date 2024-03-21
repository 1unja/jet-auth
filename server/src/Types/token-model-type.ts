import { Document, Model, Schema } from "mongoose"


export interface IToken {
    userId: Schema.Types.ObjectId
    refreshToken: string
}

export interface ITokenDocument extends IToken, Document {}
export interface ITokenModel extends Model<ITokenDocument> {
    buildRole(args: IToken): ITokenDocument
}