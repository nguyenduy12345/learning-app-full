
import LessonModel from "../models/lesson.model.js";

export const getLessonsBySectionIdAndMilestoneId = (info) => LessonModel.find(info)
export const findLessonById = (id) => LessonModel.findById(id)

export const createLesson= (data) => LessonModel.create(data)
export const adminFindLessonsBySectionAndMilestoneId = (info) => LessonModel.find(info).sort({createdAt: 1})
export const findOneAndUpdateLesson= (...args) => LessonModel.findOneAndUpdate(...args)