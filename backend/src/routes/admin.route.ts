import express from 'express'

const route = express.Router()
import adminController from '../controllers/admin.controller'

route.post('/login',adminController.login)
route.get('/survey-submissions',adminController.getSurveySubmission)


export default route