import { getLessonsBySectionIdAndMilestoneId, findLessonById } from "../repositories/lesson.repository.js";
import QuestionModel from "../models/question.model.js";
export const getLesson = async (req,res) => {
    const { sectionId, milestoneId } = req.query
    try {
        const lessons = await getLessonsBySectionIdAndMilestoneId({sectionId, milestoneId, deleted: false})
        res.status(200).send({
            data:{
                lessons
            }
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}
export const getLessonById = async (req,res) => {
    const { lessonId } = req.params
    try {
        const lesson = await findLessonById(lessonId).populate({
            path: 'questions.question',
            match: { deleted: false },
            select: '-correctDocument -correctChoose -correctMatches'
          })
        res.status(200).send({
            data:{
                lesson
            }
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}