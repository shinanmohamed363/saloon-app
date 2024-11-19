    import { Request, Response, NextFunction } from 'express';
    import jwt from 'jsonwebtoken';

    export interface UserPayload {
        userId: string;
        userRole: string;
        email: string;
    }

    const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
            return;
        }

        try {
            const decoded = jwt.verify(token, 'your-secret') as UserPayload;
            (req as any).user = decoded;  // Type casting to add user property
            next();
        } catch (ex) {
            res.status(400).json({ message: 'Invalid token.' });
        }
    };

    export default verifyToken;
