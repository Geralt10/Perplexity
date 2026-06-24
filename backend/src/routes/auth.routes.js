import express from 'express'
import { getMeController, loginController, registerController, resendVerificationEmail, verifyEmailController } from '../controllers/auth.controller.js';
import { loginValidator, registerValidator } from '../validators/auth.validation.js';
import identifyUser from '../middlewares/auth.middleware.js';


const authRouter = express.Router();

authRouter.post("/register",registerValidator,registerController);

authRouter.get("/verify-email",verifyEmailController);

authRouter.post("/login",loginValidator,loginController);

authRouter.get("/get-me",identifyUser,getMeController);

authRouter.post("/resend-verification-email",resendVerificationEmail)

export default authRouter;