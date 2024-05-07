import express from "express";
import { loginController, registerController } from "./authcontroller.js";

const router = express.Router();

// register || method post
router.post('/register', registerController);

//login || post
router.post('/login', loginController);

export default router;