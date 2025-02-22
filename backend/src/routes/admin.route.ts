import express from 'express'
import adminController from '../controllers/admin.controller'

const route = express.Router()


route.post('/login',adminController.login)
route.get('/survey-submissions',adminController.getSurveySubmission)


export default route