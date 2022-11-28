"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
/* GET users listing. */
router.post('/register', userController_1.registerUsers);
router.post('/logins', userController_1.loginUser);
router.get('/allusers', userController_1.getUsers);
router.post('/logout', userController_1.logout);
// ejs routes
router.get('/signup', userController_1.renderRegisterPage);
router.get('/signin', userController_1.renderLoginPage);
router.get('/home', userController_1.renderHomePage);
router.get('/listing1', userController_1.renderListingPage);
router.get('/listing2', userController_1.renderSecListingPage);
exports.default = router;
