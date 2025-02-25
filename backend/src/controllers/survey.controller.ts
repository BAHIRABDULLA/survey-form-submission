
import { Request, Response, NextFunction } from "express"
import surveyService from "../services/survey.service"
import adminService from "../services/admin.service"




const createSurvey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await surveyService.createSurvey(req.body)
        return res.status(200).json({message:'Survey submission form successfully created',response})
    } catch (error) {
        next(error)
    }
}

// const getAllSurveysByEmail = async (req:Request,res:Response,next:NextFunction) =>{
//     try {
//         const response = await surveyService.getAllSurveysByEmail()
//         return res.status(200).json({message:'Survey submissions fetched',response})
//     } catch (error) {
//         next(error)
//     }
// }


const fetchAllSurveys = async (req:Request,res:Response,next:NextFunction) => {
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


export default {createSurvey ,fetchAllSurveys}