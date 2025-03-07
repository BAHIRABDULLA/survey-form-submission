import IParams from "../../interfaces/IParams";
import { IAdmin } from "../../models/admin.schema";
import { ISurvey } from "../../models/survey.schema";

export interface IAdminService {
     login(data: Partial<IAdmin>): Promise<string>;
     getSurveySubmission(params: IParams): Promise<{surveys:ISurvey[],totalItems: number,currentPage: number,totalPages:number}>;
}


