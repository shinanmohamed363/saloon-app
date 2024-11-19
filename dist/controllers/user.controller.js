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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginuser = exports.createuser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const hashpassword = yield bcryptjs_1.default.hash(password, 10);
        const newuser = new user_model_1.default({
            name,
            email,
            password: hashpassword,
        });
        yield newuser.save();
        res.status(201).json(newuser);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
});
exports.createuser = createuser;
const loginuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const foundUser = yield user_model_1.default.findOne({ email });
        if (!foundUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, foundUser.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: foundUser.id,
            userRole: foundUser.role,
            email: foundUser.email,
        }, 'your-secret', // Make sure 'your-secret' is your actual secret key used for signing JWTs
        { expiresIn: '30d' });
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
            },
            token: token,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});
exports.loginuser = loginuser;
