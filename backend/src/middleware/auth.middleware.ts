import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { messageConstants } from '../constants/messages'

interface AuthRequest extends Request {
    user?: string | JwtPayload
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: messageConstants.ACCESS_DENIED })
    }

    try {
        const secretKey = process.env.JWT_SECRET as string
        if (!secretKey) {
            return res.status(401).json({ message: messageConstants.JWT_SECRET_MISSING })
        }
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded        
        next()
    } catch (error) {
        res.status(403).json({ message: messageConstants.INVALID_TOKEN });

    }
}

export default authMiddleware