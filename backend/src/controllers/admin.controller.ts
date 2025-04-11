
import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { messageConstants } from "../constants/messages"
import { HttpStatus } from "../constants/enums"
import { IAdminService } from "../services/interface/IAdmin.service"



export class AdminController {

    constructor(private adminService: IAdminService) { }

     login =async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() })
            }
            const response = await this.adminService.login(req.body)
            return res.status(HttpStatus.OK).json({ message: messageConstants.USER_LOGGED_IN, token: response })
        } catch (error) {
            next(error)
        }
    }


    
    async getSurveySubmission(req: Request, res: Response, next: NextFunction) {
        try {
            const { search = '', currentPage = 1, itemsPerPage = 5 } = req.query;
            const params = {
                search: search as string,
                page: currentPage as number,
                limit: itemsPerPage as number
            }
            const response = await this.adminService.getSurveySubmission(params)
            return res.status(HttpStatus.OK).json({ message: messageConstants.SURVEY_FORM_FETCHED, filteredResponse: response })
        } catch (error) {
            next(error)
        }
    }
}

