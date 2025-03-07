import  { ISurvey } from "../../models/survey.schema"
import { ISurveyRepository } from "../../repositories/interface/ISurvey.repository";
import { ISurveyService } from "../interface/ISurvey.service";
import { ISurveyValidator } from "./validation.service";



export class SurveyService implements ISurveyService{
     
    constructor(
        private surveyRepository: ISurveyRepository,
        private surveyValidator: ISurveyValidator
    ) { }
    async createSurvey(data: Partial<ISurvey>) {
        try {
            this.surveyValidator.validate(data)
     
            
            const response = await this.surveyRepository.create(data)
            return response
        } catch (error) {
            throw error
        }
    }
}


