import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { type Request, type Response, type NextFunction } from "express";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error("JWT_SECRET is missing in environment variables");
}

export interface AuthRequest extends Request {
    user?: any;
}

const checkAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default checkAuth;