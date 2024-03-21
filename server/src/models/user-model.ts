import { Schema, model } from "mongoose";
import { IUserDocument, IUserModel } from "../Types/user-model-type";


const userSchema = new Schema<IUserDocument>({
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    isActivated: {type: Boolean, require: true, default: false},
    activationLink: {type: String, require: true}
})

const User = model<IUserDocument, IUserModel>('User', userSchema)

export default User