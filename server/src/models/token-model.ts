import { Schema, model } from "mongoose";
import { ITokenDocument, ITokenModel } from "../Types/token-model-type";


const TokenSchema = new Schema<ITokenDocument>({
    userId: {type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: {type: String, require: true}
})

const TokenModel = model<ITokenDocument, ITokenModel>('RefreshToken', TokenSchema)

export default TokenModel