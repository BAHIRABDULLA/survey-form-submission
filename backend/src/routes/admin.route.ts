import express from 'express'
import adminController from '../controllers/admin.controller'
import authMiddleware from '../middleware/auth.middleware'

const route = express.Router()


route.post('/login',adminController.login)
route.get('/survey-submissions',authMiddleware,adminController.getSurveySubmission)


export default route