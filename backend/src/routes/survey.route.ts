import express from 'express'
import surveyController from '../controllers/survey.controller'

const router = express.Router()


router.post('/',surveyController.createSurvey)
// router.get('/',surveyController.getAllSurveysByEmail)

export default router