import Survey, { ISurvey } from "../models/survey.schema"
import CustomError from "../utils/custom.error";


const createSurvey = async (data: Partial<ISurvey>) => {
    try {
        const survey = new Survey(data)
        const validationError = survey.validateSync()
        if(validationError){ 
            throw new CustomError((Object.values(validationError.errors)[0].message|| 'validation error'),405)
        }
        const response = await Survey.insertOne(data)
        return response
    } catch (error) {
        throw error
    }
}

// const getAllSurveysByEmail = async () =>{
//     try {
//         const getSurveys = await Survey.find({email})
//     } catch (error) {
//         throw error
//     }
// }

export default { createSurvey }