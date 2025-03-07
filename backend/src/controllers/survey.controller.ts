
import { Request, Response, NextFunction } from "express"
import { messageConstants } from "../constants/messages"
import { HttpStatus } from "../constants/enums"
import { IAdminService } from "../services/interface/IAdmin.service"
import { ISurveyService } from "../services/interface/ISurvey.service"


export class SurveyController {
    
    constructor(private surveyService:ISurveyService ,private adminService:IAdminService ) { }


    async createSurvey(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.surveyService.createSurvey(req.body)
            return res.status(HttpStatus.CREATED).json({message:messageConstants.SURVEY_FORM_CREATED,response})
        } catch (error) {
            next(error)
        }
    }

    async fetchAllSurveys(req:Request,res:Response,next:NextFunction) {
        try {
            const { search='', currentPage=1, itemsPerPage=5 } = req.query;
            const params ={
                search:search as string,
                page: currentPage as number,
                limit: itemsPerPage as number
            }
            const response = await this.adminService.getSurveySubmission(params)
            return res.status(HttpStatus.OK).json({message:messageConstants.SURVEY_FORM_FETCHED, filteredResponse:response})
        } catch (error) {
            next(error)
        }
    }
}
