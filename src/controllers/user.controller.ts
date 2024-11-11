import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import user, { Iuser } from '../models/user.model';
import jwt from 'jsonwebtoken';

export const createuser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const hashpassword = await bcrypt.hash(password, 10);

        const newuser: Iuser = new user({
            name,
            email,
            password: hashpassword,
        });

        await newuser.save();
        res.status(201).json(newuser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred.' });
        }
    }
};

export const loginuser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const foundUser = await user.findOne({ email });

        if (!foundUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid password' });
            return;
        }
        const token = jwt.sign(
            {
                userId: foundUser.id,
                userRole: foundUser.role,
                email: foundUser.email,
            },
            'your-secret',  // Make sure 'your-secret' is your actual secret key used for signing JWTs
            { expiresIn: '30d' }
        );

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
            },
            token: token,
        });
    } catch (error: any) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
