"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepositories = void 0;
exports.authRepositories = {
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.json("1234");
            }
            catch (e) {
                console.log(e);
                res.status(401).json('Not authorized');
            }
        });
    },
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (e) {
                console.log(e);
                res.status(401).json('Not authorized');
            }
        });
    },
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (e) {
                console.log(e);
                res.status(401).json('Not authorized');
            }
        });
    },
    logoutUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (e) {
                console.log(e);
                res.status(401).json('Not authorized');
            }
        });
    },
    acitvateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (e) {
                console.log(e);
                res.status(401).json('Not authorized');
            }
        });
    },
    refreshUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (e) {
                console.log(e);
                res.status(401).json('Not authorized');
            }
        });
    },
};
