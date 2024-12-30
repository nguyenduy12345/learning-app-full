import { Router } from "express";
import { getLesson, getLessonById } from "../controllers/lesson.controller.js";
const LessonRouter = Router()

LessonRouter.get('/', getLesson)
LessonRouter.get('/:lessonId', getLessonById)

export default LessonRouter