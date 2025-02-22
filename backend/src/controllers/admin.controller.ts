
import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import adminService from "../services/admin.service"



const login = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const errors = validationResult(req) 
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        await adminService.login(req.body)
        return res.status(200).json({message:'Login successful'})
    } catch (error) {
        console.error('Error founded in login controller ',error);
        next(error)
    }
}


const getSurveySubmission = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const response = await adminService.getSurveySubmission()
        return res.status(200).json({message:'data fetched ',response})
    } catch (error) {
        next(error)
    }
}


export =  {
    login,
    getSurveySubmission
} 