import LearningProcessModel from "../models/learningProcess.model.js";

export const getCourseByUserIdInLearningProcess = (info) => LearningProcessModel.find(info)
export const findLearningProccessByUserIdAndCourseId = (info) => LearningProcessModel.findOne(info)
export const createNewLearningProcessByUserId = (data) => LearningProcessModel.create(data)
export const findAndUpdateRecentAccessAt = (...args) => LearningProcessModel.findOneAndUpdate(...args)