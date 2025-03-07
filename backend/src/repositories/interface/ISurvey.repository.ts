import { ISurvey } from "../../models/survey.schema";
import { IBaseRepository } from "./IBase.repository";

export interface ISurveyRepository extends IBaseRepository<ISurvey> {
    
    findFilteredSurveys(query: any , skip: number, limit: number): Promise<ISurvey[]>;
    countDocuments(query: any): Promise<number>;
}
