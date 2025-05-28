import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModels.js';

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                code: 402,
                success: false,
                error: 'email already exist',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(username, email, hashedPassword);

        const token = jwt.sign(
            {
                userId: newUser.Id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '14d',
            }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 14 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        });
        return res.status(201).json({
            success: true,
            response: newUser,
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            success: false,
            error: 'signup failed! internal server error',
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password, userType } = req.body;
        const user = await findUserByEmail(email, userType);
        if (!user)
            return res.status(404).json({
                code: 404,
                success: false,
                error: 'user does not exist',
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                code: 400,
                success: false,
                error: 'Invalid credentials',
            });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: '14d',
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 14 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        });
        return res.status(200).json({
            code: 200,
            success: true,
            response: {
                id: user.id,
                username: user.username,
                email: user.email,
                pro: user.pro,
            },
        });
    } catch (err) {
        res.status(500).json({
            code: 500,
            success: false,
            error: 'login failed! internal server error',
        });
    }
};

export { signup, login };
