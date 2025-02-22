import { Admin, IAdmin } from "../models/admin.schema";
import Survey from "../models/survey.schema";
import CustomError from "../utils/custom.error";
import bcrypt from 'bcryptjs'


const login = async (data:Partial<IAdmin>)=>{
    try {
        const checkAdmin = await Admin.findOne({email:data.email})
        if(!checkAdmin || !data.password){
            throw new CustomError("Admin not existed ",402)
        }
        const isMatch = await bcrypt.compare(data.password, checkAdmin.password)
        console.log(isMatch,'is match djsfjdskfdkj');
        
        if(!isMatch){
            throw new CustomError('Invalid credentials',401)
        }

        console.log(checkAdmin,'check admin');
        return 
    } catch (error) {
        throw error
    }
}


const getSurveySubmission = async()=>{
    try {
        const response = await Survey.find()
        return response
    } catch (error) {
        throw error
    }
}

export default {login , getSurveySubmission}