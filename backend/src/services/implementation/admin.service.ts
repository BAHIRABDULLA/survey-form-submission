import { HttpStatus } from "../../constants/enums";
import { messageConstants } from "../../constants/messages";
import { IAdmin } from "../../models/admin.schema";
import CustomError from "../../utils/custom.error";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { IAdminRepository } from "../../repositories/interface/IAdmin.repository";
import IParams from "../../interfaces/IParams";
import { IAdminService } from "../interface/IAdmin.service";
import { ISurveyRepository } from "../../repositories/interface/ISurvey.repository";



export class AdminService implements IAdminService {

    constructor(private adminRepository: IAdminRepository ,private surveyRepository:ISurveyRepository) { }

    async login(data: Partial<IAdmin>) {
        try {
            const checkAdmin = await this.adminRepository.findOne({ email: data.email })
            if (!checkAdmin || !data.password) {
                throw new CustomError(messageConstants.ADMIN_NOT_FOUND, HttpStatus.UNAUTHORIZED)
            }
            const isMatch = await bcrypt.compare(data.password, checkAdmin.password)

            if (!isMatch) {
                throw new CustomError(messageConstants.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED)
            }
            const secretKey = process.env.JWT_SECRET
            if (!secretKey) {
                throw new CustomError(messageConstants.JWT_SECRET_MISSING, HttpStatus.UNAUTHORIZED)
            }
            const token = jwt.sign(
                { id: checkAdmin._id }, secretKey, { expiresIn: '1h' }
            )
            return token
        } catch (error) {
            throw error
        }
    }

    async getSurveySubmission(params: IParams) {
        try {
            const { search, page, limit } = params
            const skip = (page - 1) * limit
            const query = search ? {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { nationality: { $regex: search, $options: 'i' } },
                    ...(!/[^0-9]/.test(search) ? [{ phoneNumber: search }] : []),
                ]
            } : {};

            const surveys = await this.surveyRepository.findFilteredSurveys(query, skip, limit)
            const totalSurveys = await this.surveyRepository.countDocuments(query)

            return {
                surveys,
                totalItems: totalSurveys,
                currentPage: page,
                totalPages: Math.ceil(totalSurveys / limit)
            }
        } catch (error) {
            throw error
        }
    }

}


