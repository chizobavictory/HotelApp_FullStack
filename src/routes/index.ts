import express from "express";
import { renderHomePage} from "../controller/userController"

const router = express.Router();


router.get('/home', renderHomePage);

export default router;
