import { AdminController } from "../controllers/admin.controller";
import { SurveyController } from "../controllers/survey.controller";
import { AdminRepository } from "../repositories/implementation/admin.repository";
import { SurveyRepository } from "../repositories/implementation/survey.repository";
import { AdminService } from "../services/implementation/admin.service";
import { SurveyService } from "../services/implementation/survey.service";
import { SurveyValidator } from "../services/implementation/validation.service";



const surveyRepository = new SurveyRepository();
const surveyValidator = new SurveyValidator();
const surveyService = new SurveyService(surveyRepository, surveyValidator);


const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository, surveyRepository);

const surveyController = new SurveyController(surveyService, adminService);
const adminController = new AdminController(adminService);

export { surveyController, adminController }
