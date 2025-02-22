
import { Request, Response, NextFunction } from "express"
import surveyService from "../services/survey.service"




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


export default {createSurvey}