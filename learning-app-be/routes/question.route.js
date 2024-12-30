import { Router } from "express"
import { getQuestionAndCheckCorrect, getQuestions } from "../controllers/question.controller.js"
const QuestionRouter = Router()

QuestionRouter.get('/', getQuestions)
QuestionRouter.post('/:questionId', getQuestionAndCheckCorrect)

export default QuestionRouter