import express from "express";
var router = express.Router();
import {
  login,
  loginWithGoogle,
  register,
} from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.post("/loginWithGoogle", loginWithGoogle);

export default router;
