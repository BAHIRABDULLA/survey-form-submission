import express from 'express'
import surveyController from '../controllers/survey.controller'

const router = express.Router()


router.post('/',surveyController.createSurvey)
router.get('/survey-submissions',surveyController.fetchAllSurveys)

export default router