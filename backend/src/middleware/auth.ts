import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    userId?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ error: 'Access denied' });
        return;
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.userId = (verified as any).userId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
