import express from 'express'
import { forgotPasswordController, getMeController, loginController, logoutController, refreshTokenController, registerController, resendVerificationEmail, resetPasswordController, verifyEmailController } from '../controllers/auth.controller.js';
import { loginValidator, registerValidator, resetPasswordValidator } from '../validators/auth.validation.js';
import identifyUser from '../middlewares/auth.middleware.js';


const authRouter = express.Router();

authRouter.post("/register",registerValidator,registerController);

authRouter.get("/verify-email",verifyEmailController);

authRouter.post("/login",loginValidator,loginController);

authRouter.get("/get-me",identifyUser,getMeController);

authRouter.post("/resend-verification-email",resendVerificationEmail);

authRouter.post("/refresh-token",refreshTokenController);

authRouter.post("/logout",logoutController);

authRouter.post("/forgot-password",forgotPasswordController);

authRouter.post("/reset-password",resetPasswordValidator,resetPasswordController)

export default authRouter;