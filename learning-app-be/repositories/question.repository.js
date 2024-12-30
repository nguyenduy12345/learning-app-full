import QuestionModel from "../models/question.model.js";

export const findQuestionById = (id) => QuestionModel.findById(id)
export const createNewQuestion = (data) => QuestionModel.insertMany(data)
export const findAllQuestions = () => QuestionModel.find()
export const findQuestionByIdAndUpdate = (...args) => QuestionModel.findByIdAndUpdate(...args)