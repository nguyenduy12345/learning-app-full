import { Router } from "express";

import { getAllCourse, getOneCourse } from "../controllers/course.controller.js";

const CourseRouter = Router()

CourseRouter.get('/', getAllCourse)
CourseRouter.get('/:courseId', getOneCourse)

export default CourseRouter