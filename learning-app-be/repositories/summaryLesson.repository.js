import SummaryLessonModel from "../models/summaryLesson.model.js";

export const getSummaryLessonByUserId = (userId) => SummaryLessonModel.findOne(userId)
export const createSummaryLessonByUserId = (data) => SummaryLessonModel.create(data)