import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface AuthRequest extends Request {
    user?: string | JwtPayload
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Access denied' })
    }

    try {
        const secretKey = process.env.JWT_SECRET as string
        if (!secretKey) {
            return res.status(401).json({ message: 'JWT secret is missing' })
        }
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded        
        next()
    } catch (error) {
        res.status(403).json({ message: "Invalid Token" });

    }
}

export default authMiddleware