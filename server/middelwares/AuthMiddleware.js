import jwt from "jsonwebtoken";
import { message } from "../config/message.js";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

      
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: message.USER_NOT_AUTHENTICATE
      });
    }

 
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Token Verification Error:", error.message);
    
    return res.status(401).json({
      success: false,
      status: 401,
      message: message.INVALID_TOKEN
    });
  }
};
