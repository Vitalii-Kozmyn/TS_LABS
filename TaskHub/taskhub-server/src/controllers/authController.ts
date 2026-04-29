import bcrypt from "bcrypt";
import User, { type IUser } from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { type Request, type Response } from "express";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN as string;

if (!jwtSecret) {
    throw new Error("JWT_SECRET is missing in environment variables");
}

if (!jwtExpiresIn) {
    throw new Error("JWT_EXPIRES_IN is missing in environment variables");
}

export async function register(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser: IUser | null = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt: string = await bcrypt.genSalt(10);
        const hashedPassword: string = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            passwordHash: hashedPassword
        });

        const token: string = jwt.sign(
            { id: (newUser._id as any).toString(), email: newUser.email }, 
            jwtSecret,  
            { expiresIn: jwtExpiresIn as any } 
        );

        return res.status(201).json({ message: "Registration was successful!", token: token });
        
    } catch (error) {
        return res.status(500).json({ message: 'Server error during registration' });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user: IUser | null = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Incorrect email or password' });
        }

        const isMatch: boolean = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect email or password' });
        }

        const dataUserForToken = { id: String((user as any)._id), email: user.email };
        
        const token = jwt.sign(dataUserForToken, jwtSecret, { expiresIn: jwtExpiresIn as any });

        return res.status(200).json({ message: "Login successful!", token: token });
        
    } catch (error) {
        return res.status(500).json({ message: 'Server error during login' });
    }
}