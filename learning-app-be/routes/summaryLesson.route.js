import { Router } from 'express'

import { getSummaryLesson, addLessonInSummaryLesson, updateLessonInSummaryLesson } from '../controllers/summaryLesson.controller.js'

const SummaryLessonRouter = Router()

SummaryLessonRouter.get('/', getSummaryLesson)
SummaryLessonRouter.patch('/add_lesson', addLessonInSummaryLesson)
SummaryLessonRouter.patch('/update_lesson', updateLessonInSummaryLesson)

export default SummaryLessonRouter