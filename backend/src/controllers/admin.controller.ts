
import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import adminService from "../services/admin.service"



const login = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const errors = validationResult(req) 
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const response = await adminService.login(req.body)
        return res.status(200).json({message:'Login successful',token:response})
    } catch (error) {
        console.error('Error founded in login controller ',error);
        next(error)
    }
}


const getSurveySubmission = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const { search='', currentPage=1, itemsPerPage=5 } = req.query;

        
        const params ={
            search:search as string,
            page: currentPage as number,
            limit: itemsPerPage as number
        }
        const response = await adminService.getSurveySubmission(params)
        return res.status(200).json({message:'data fetched ', filteredResponse:response})
    } catch (error) {
        next(error)
    }
}


export =  {
    login,
    getSurveySubmission
} 