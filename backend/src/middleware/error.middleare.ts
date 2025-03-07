import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/custom.error';
import { messageConstants } from '../constants/messages';




const errorHandler = (err:any , req:Request,res:Response,next:NextFunction)=>{
    if(err instanceof CustomError) {
        return res.status(err.statusCode).json({
            message:err.message
        })
    }    
    res.status(500).json({
        message: err.message || messageConstants.INTERNAL_SERVER_ERROR,
    })
}

export default errorHandler