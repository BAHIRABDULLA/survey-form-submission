import { HttpStatus } from "../../constants/enums";
import { messageConstants } from "../../constants/messages";
import Survey, { ISurvey } from "../../models/survey.schema";
import CustomError from "../../utils/custom.error";

export interface ISurveyValidator {
    validate(data: Partial<ISurvey>): void;
}

export  class SurveyValidator implements ISurveyValidator {
    validate(data: Partial<ISurvey>): void {
        const survey = new Survey(data);
        const validationError = survey.validateSync();
        if (validationError) {
            throw new CustomError((Object.values(validationError.errors)[0].message ||  messageConstants.VALIDATION_ERROR), HttpStatus.FORBIDDEN);
        }
    }
}
