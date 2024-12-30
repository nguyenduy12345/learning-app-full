import { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import authMiddleware from "../middlewares/auth.middlewares.js";
import {
  adminGetAllUsers,
  adminHandleBanAccount,
  adminHandleCreateCourse,
  getAllCourse,
  adminHandleUpdateStatusCourse,
  adminHandleUpdateInfomationCourse,
  getAllSection,
  adminHandleCreateSection,
  adminHandleUpdateSection,
  getAllMilestoneBySectionId,
  adminHandleCreateMilestone,
  adminHandleUpdateMilestone,
  getAllLessonBySectionIdAndMilestoneId,
  adminHandleCreateLesson,
  adminHandleUpdateLesson,
  adminHandleDeleteQuestionInLesson,
  adminHandleCreateQuestions,
  adminHandleUpdateQuestion,
  adminHandleDeleteQuestion,
  adminHandleCreateMisson,
  adminFindAllMisson,
  adminHandleDeleteMisson,
  adminHandleUpdateMisson
} from "../controllers/admin.controller.js";
import { 
  validateCreateCourseRequest, validateUpdateInfomationCourseRequest, 
  validateCreateSectionRequest, validateUpdateSectionRequest, 
  validateCreateMilestoneRequest, validateUpdateMilestoneRequest, 
  validateCreateLessonRequest, validateUpdateLessonRequest,
  validateCreateQuestionsRequest, validateUpdateQuestionsRequest,
  validateCreateAndUpdateMissonRequest } from "../validations/adminRequest.validation.js";
const AdminRouter = Router();

AdminRouter.use(authMiddleware.authorization);
// User: 
AdminRouter.get("/users", adminGetAllUsers);
AdminRouter.patch("/users/:userId", adminHandleBanAccount);
// Course:
AdminRouter.get("/courses", getAllCourse);
AdminRouter.post(
  "/courses",
  upload.single("file"),
  validateCreateCourseRequest,
  adminHandleCreateCourse
);
AdminRouter.patch("/courses/:courseId", adminHandleUpdateStatusCourse);
AdminRouter.patch("/courses/update/:courseId", upload.single("file"), validateUpdateInfomationCourseRequest, adminHandleUpdateInfomationCourse);
// Section
AdminRouter.get("/sections", getAllSection);
AdminRouter.post("/sections", validateCreateSectionRequest, adminHandleCreateSection);
AdminRouter.patch("/sections/:sectionId",validateUpdateSectionRequest, adminHandleUpdateSection);
// Milestone
AdminRouter.get("/milestones", getAllMilestoneBySectionId);
AdminRouter.post("/milestones", validateCreateMilestoneRequest, adminHandleCreateMilestone);
AdminRouter.patch("/milestones/:milestoneId",validateUpdateMilestoneRequest, adminHandleUpdateMilestone);
// Lesson
AdminRouter.get("/lessons", getAllLessonBySectionIdAndMilestoneId);
AdminRouter.post("/lessons", validateCreateLessonRequest, adminHandleCreateLesson);
AdminRouter.patch("/lessons/:lessonId", validateUpdateLessonRequest, adminHandleUpdateLesson);
AdminRouter.patch("/lessons/delete_question/:lessonId", adminHandleDeleteQuestionInLesson);
// Question
AdminRouter.post("/questions", validateCreateQuestionsRequest, adminHandleCreateQuestions);
AdminRouter.patch("/questions/update/:questionId",validateUpdateQuestionsRequest, adminHandleUpdateQuestion);
AdminRouter.patch("/questions/delete/:questionId", adminHandleDeleteQuestion);
// Misson
AdminRouter.get("/missons", adminFindAllMisson);
AdminRouter.post("/missons", validateCreateAndUpdateMissonRequest, adminHandleCreateMisson);
AdminRouter.patch("/missons/update/:missonId", validateCreateAndUpdateMissonRequest, adminHandleUpdateMisson);
AdminRouter.patch("/missons/delete/:missonId", adminHandleDeleteMisson);

export default AdminRouter;
