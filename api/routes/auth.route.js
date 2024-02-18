import express from "express";
import { SignUp, signIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup', SignUp)
router.post('/signin', signIn)


export default router