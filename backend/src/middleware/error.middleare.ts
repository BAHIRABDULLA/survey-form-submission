import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/custom.error';

const errorHandler = (err:any , req:Request,res:Response,next:NextFunction)=>{
    console.error(err.stack,'erro.stack');
    if(err instanceof CustomError) {
        return res.status(err.statusCode).json({
            message:err.message
        })
    }
    console.log(err.message,'j-------------------');
    
    res.status(500).json({
        message: err.message || 'Internal server error',
    })
}

export default errorHandler