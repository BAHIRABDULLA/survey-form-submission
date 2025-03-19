import express from 'express'
import { surveyController } from '../config/container'


const router = express.Router()


router.post('/', surveyController.createSurvey.bind(surveyController))
router.get('/survey-submissions', surveyController.fetchAllSurveys.bind(surveyController))

export default router