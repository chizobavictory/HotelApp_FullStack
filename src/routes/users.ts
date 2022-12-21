import express from "express";

const router = express.Router();

import {
  loginUser,
  registerUsers,
  getUsers,
  renderRegisterPage,
  renderLoginPage,
  renderListingPage,
  renderSecListingPage,
  logout,
} from "../controller/userController";

/* GET users listing. */
router.post("/register", registerUsers);
router.post("/login", loginUser);
router.get("/allusers", getUsers);
router.post("/logout", logout);

// ejs routes
router.get("/signup", renderRegisterPage);
router.get("/signin", renderLoginPage);

router.get("/listing1", renderListingPage);
router.get("/listing2", renderSecListingPage);

export default router;
