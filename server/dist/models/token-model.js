"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TokenSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, require: true }
});
const TokenModel = (0, mongoose_1.model)('RefreshToken', TokenSchema);
exports.default = TokenModel;