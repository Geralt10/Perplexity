import jwt from "jsonwebtoken";
import redisClient from "../config/cache.js";

async function identifyUser(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      err: "No access token provided",
    });
  }

  const isBlacklisted = await redisClient.get(`blacklist:${accessToken}`);

  if (isBlacklisted) {
    return res.status(401).json({
      message: "Token has been revoked",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid access token",
      success: false,
      err: error.message,
    });
  }
}

export default identifyUser;
