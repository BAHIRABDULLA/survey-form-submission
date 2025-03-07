import express from 'express'
import { surveyController } from '../config/container'


const router = express.Router()


router.post('/', surveyController.createSurvey)
router.get('/survey-submissions', surveyController.fetchAllSurveys)

export default router