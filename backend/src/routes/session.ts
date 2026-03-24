import { Router } from 'express';
import type { Response } from 'express';
import { authenticate } from '../middleware/auth';
import Session from '../models/Session';
import type { Request } from 'express';

const router = Router();

interface AuthRequest extends Request {
    userId?: string;
}

router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const { text, keystrokes, pasteCount, pastedLength } = req.body;

        const session = new Session({
            userId: req.userId,
            text,
            keystrokes,
            pasteCount,
            pastedLength
        });

        await session.save();
        res.status(201).json({ message: 'Session saved', sessionId: session._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
