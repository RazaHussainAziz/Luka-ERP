import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    createUser,
    emailExists,
    findUserByEmail,
    findEmployeeByEmail,
} from '../models/userModels.js';

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await emailExists(email);

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
                sub: newUser.id,
                role: 'admin',
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '14d',
            }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            credentials: 'true',
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
        const { email, password } = req.body;

        const isEmployee = email.substring(0, 9);

        if (isEmployee == 'employee.') {
            const employee = await loginForEmployee({ email, password });
            const token = jwt.sign(
                { sub: employee.id, role: 'employee' },
                process.env.JWT_SECRET,
                {
                    expiresIn: '14d',
                }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: false, //true on https
                credentials: 'true',
                maxAge: 14 * 24 * 60 * 60 * 1000,
                sameSite: 'strict',
            });
            return res.status(200).json({
                code: 200,
                success: true,
                response: {
                    id: employee.id,
                    username: employee.username,
                    email: employee.email,
                    department: employee.department,
                    admin_id: employee.admin_id,
                },
            });
        } else {
            const user = await loginForAdmin({ email, password });
            const token = jwt.sign(
                { sub: user.id, role: 'admin' },
                process.env.JWT_SECRET,
                {
                    expiresIn: '14d',
                }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                credentials: 'true',
                maxAge: 14 * 24 * 60 * 60 * 1000,
                sameSite: 'strict',
            });
            res.status(200).json({
                code: 200,
                success: true,
                response: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    pro: user.pro,
                },
            });
        }
    } catch (err) {
        res.status(500).json({
            code: 500,
            success: false,
            error: 'login failed! internal server error',
        });
    }
};

async function loginForAdmin({ email, password }) {
    const user = await findUserByEmail(email);

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

    return user;
}
async function loginForEmployee({ email, password }) {
    const employee = await findEmployeeByEmail(email);

    if (!employee)
        return res.status(404).json({
            code: 404,
            success: false,
            error: 'user does not exist',
        });
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch)
        return res.status(400).json({
            code: 400,
            success: false,
            error: 'Invalid credentials',
        });

    return employee;
}
export { signup, login };
