import express from 'express'
import { loginController, registerController, verifyEmailController } from '../controllers/auth.controller.js';
import { loginValidator, registerValidator } from '../validators/auth.validation.js';


const authRouter = express.Router();

authRouter.post("/register",registerValidator,registerController);

authRouter.get("/verify-email",verifyEmailController);

authRouter.post("/login",loginValidator,loginController)

export default authRouter;