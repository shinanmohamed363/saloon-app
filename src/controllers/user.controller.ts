import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import user, { IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';

export const createuser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Manually generate userID based on the role or default to 'user'
    const userID = `${role ? role.toLowerCase() : 'user'}${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

    // Create a new user instance with the manually generated userID
    const newUser: IUser = new user({
      userID,  // Assign the generated userID
      name,
      email,
      password: hashPassword,
      role: role || 'Customer', // Default to 'Customer' if no role is provided
    });

    // Save the new user
    await newUser.save();

    // Return the response with the newly created user
    res.status(201).json(newUser);
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
                userID: foundUser.userID,
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
