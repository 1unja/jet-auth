"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    isActivated: { type: Boolean, require: true, default: false },
    activationLink: { type: String, require: true }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
