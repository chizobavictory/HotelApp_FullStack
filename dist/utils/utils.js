"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.loginSchema = exports.registerSchema = exports.updateHotelSchema = exports.createHotelSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createHotelSchema = joi_1.default.object().keys({
    description: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    numOfBeds: joi_1.default.number().required(),
    numOfBaths: joi_1.default.number().required(),
    ratings: joi_1.default.number().required()
});
exports.updateHotelSchema = joi_1.default.object().keys({
    description: joi_1.default.string(),
    image: joi_1.default.string(),
    address: joi_1.default.string(),
    price: joi_1.default.number(),
    numOfBeds: joi_1.default.number(),
    numOfBaths: joi_1.default.number(),
    ratings: joi_1.default.number()
});
exports.registerSchema = joi_1.default.object().keys({
    fullName: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phoneNumber: joi_1.default.string().length(11).pattern(/^[0-9]+$/).required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: joi_1.default.ref("password"),
}).with("password", "confirm_password");
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});
//generate tokens
const generateToken = (user) => {
    const pass = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
