/** @format */

import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { senEmail } from "../services/mail.service.js";


export async function registerController(req, res, next) {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists && isUserExists.verified) {
    return res.status(400).json({
      message: "user already exists",
      success: false,
      err: "user already exists",
    });
  }

  if (isUserExists && !isUserExists.verified) {
       await isUserExists.deleteOne();
}

  const user = await userModel.create({ username, email, password });

  const emailVerificationToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}`;

  await senEmail({
    to: email,
    subject: "Welcome to Perplexity",
    html: `
    <p>Hi ${username},</p>
    <p>Thank you for registering at <strong>Perplexity</strong>.</p>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${verificationLink}">Verify Email</a>
    <p>Or copy and paste this URL in your browser:</p>
    <p>${verificationLink}</p>
  `,
  });

   return res.status(201).json({
    message: "user registered successfully",
    success: true,
    user: {
      username: user.username,
      email: user.email,
    },
  });
}



export async function verifyEmailController(req, res) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  

  const user = await userModel.findOne({ email: decoded.email });

  if (!user) {
    return res.status(400).json({
      message: "invalid token",
      success: false,
      err: "user not found",
    });
  }

  if (user.verified) {
  return res.send("<h1>✅ Email already verified.</h1>");
}

  user.verified = true;

  await user.save();

  return res.send(`
      <h1>✅ Email Verified Successfully</h1>
      <p>Your email has been verified.</p>
  `);
  }
   catch (error) {
    return res.status(400).json({
        message:"invalid or expired token",
        success:false,
        err:error.message
    })
  }
}


export async function loginController(req,res) {
    const{email,password}=req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({
            message:"invalid email or password",
            success:false,
            err:"user not found"
        })
    }

    const isMatchedPassword = await user.comparePassword(password);

    if(!isMatchedPassword){
        return res.status(400).json({
            message:"invalid email or password",
            success:false,
            err:"user not found"
        })
    }

    if(!user.verified){
        return res.status(400).json({
            message:"please verify your email",
            success:false,
            err:"email not verified"
        })
    }

    const token = jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET,{expiresIn:"7d"});

    res.cookie("token",token);

    return res.status(200).json({
        message:"loggedIn successfully",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}
