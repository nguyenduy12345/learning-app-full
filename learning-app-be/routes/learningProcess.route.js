import { Router } from "express";
import { getCourseOfLearningProcess, addCourseToLearningProcess, updateRecentAccessOfCourseInLearningProcess, addSectionToLearningProcess, addMilestoneToLearningProcess, updateStatusTotalMilestoneTotalMilestoneDoneInSection, updateCurrentLessonStatusTotalLessonDoneMilestone } from "../controllers/learningProcess.controller.js";
const LearningProcessRouter = Router()

LearningProcessRouter.get('/', getCourseOfLearningProcess)
LearningProcessRouter.post('/add_course', addCourseToLearningProcess)
LearningProcessRouter.patch('/update_recent_access', updateRecentAccessOfCourseInLearningProcess)
LearningProcessRouter.patch('/add_section', addSectionToLearningProcess)
LearningProcessRouter.patch('/add_milestone', addMilestoneToLearningProcess)
LearningProcessRouter.patch('/update_section', updateStatusTotalMilestoneTotalMilestoneDoneInSection)
LearningProcessRouter.patch('/update_milestone', updateCurrentLessonStatusTotalLessonDoneMilestone)


export default LearningProcessRouter