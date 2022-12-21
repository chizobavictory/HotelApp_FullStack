import express from "express";
import { renderHomePage} from "../controller/userController"

const router = express.Router();


router.get('/', renderHomePage);

export default router;
