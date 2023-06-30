import express from "express";
var router = express.Router();
import { login, register } from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);

export default router;
