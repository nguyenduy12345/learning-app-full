import { getSummaryLessonByUserId } from "../repositories/summaryLesson.repository.js"
import { findLessonById } from "../repositories/lesson.repository.js"

export const getSummaryLesson = async(req, res) => {
    const { _id } = req.currentUser
    try {
        let summaryLesson = await getSummaryLessonByUserId({userId: _id}).populate("lessons.lesson")
        res.status(200).send({
            data: {
                summaryLesson
            }
        })
        return
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}
export const addLessonInSummaryLesson = async(req, res) => {
    const { _id } = req.currentUser
    const { lessonId } = req.body
    try {
        if(!lessonId) throw new Error("validation.required", {
            field: req.translate('lesson')
        })
        let listLesson = await getSummaryLessonByUserId({userId: _id})
        const isLesson = await findLessonById(lessonId)
        if(!isLesson) throw new Error(req.translate("validation.find.failed", {
            field: req.translate('lesson')
        }))
        const findIndexLesson = listLesson?.lessons?.findIndex(lesson => lesson.lesson.toString() === lessonId.toString())
        if(findIndexLesson > -1) throw new Error(req.translate("validation.add.failed", {
            field: req.translate('lesson')
        }))
        listLesson?.lessons.push({
            lesson: lessonId
        })
        await listLesson.save()
        res.status(201).send({
            message: req.translate("validation.add.success",{
                field: req.translate('lesson')
            })
        })
    } catch (error) {
        res.status(401).send({
            message: error.message
        })
    }
}

export const updateLessonInSummaryLesson = async(req, res) => {
    const { _id } = req.currentUser
    const { lessonId, questionId } = req.body
    try {
        if(!lessonId) throw new Error(req.translate("validation.required", {
            field: req.translate('lesson')
        }))
        let listLesson = await getSummaryLessonByUserId({userId: _id})
        const isLesson = await findLessonById(lessonId)
        if(!isLesson) throw new Error(req.translate("validation.find.failed", {
            field: req.translate('lesson')
        }))
        const findIndexLesson = listLesson.lessons.findIndex(lesson => lesson.lesson.toString() === lessonId.toString())
        if(findIndexLesson < 0) throw new Error(req.translate("validation.find.failed", {
            field: req.translate('lesson')
        }))
        const findIndexQuestion = listLesson.lessons[findIndexLesson].wrongQuestions.findIndex(question => question.toString() === questionId.toString()) 
        if(findIndexQuestion > -1) throw new Error(req.translate("validation.add.failed", {
            field: req.translate('question')
        }))
        listLesson.lessons[findIndexLesson].wrongQuestions.push(questionId)
        await listLesson.save()
        res.status(201).send({
            message: req.translate("validation.update.success", {
                field: req.translate('lesson')
            })
        })
    } catch (error) {
        res.status(401).send({
            message: error.message
        })
    }
}
