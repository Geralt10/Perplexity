import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";

export async function registerController(req,res,next) {
    const {username,email,password}=req.body;
    
}

