import User from "../models/User.js";
import { generateToken } from "../config/jwt.js";
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        const hashedPassword = await bcrypt.hash(password, 8);


        const user = new User({
            username,
            email,
            password: hashedPassword
        });


        await user.save();


        const token = generateToken(user);
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

        return res.status(201).json({ message: "User registered successfully", token, user });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // console.log('Input password:', password);
        // console.log('Stored hashed password:', user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: "Wrong password" });
        }

        const token = generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        res.set('Authorization', `Bearer ${token}`);
        return res.status(200).json({ message: "User logged in successfully", token, user });
    } catch (error) {
        next(error);
    }
};
