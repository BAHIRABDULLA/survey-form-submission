import Survey, { ISurvey } from "../../models/survey.schema";
import { ISurveyRepository } from "../interface/ISurvey.repository";
import { BaseRepository } from "./base.repository";


export class SurveyRepository extends BaseRepository<ISurvey> implements ISurveyRepository {
    constructor() {
        super(Survey);
    }

    async findFilteredSurveys(query: any , skip: number, limit: number) {
        return this.model.find(query).skip(skip).limit(limit);
    }

    countDocuments(query: any): Promise<number> {
        return this.model.countDocuments(query);
    }
}  