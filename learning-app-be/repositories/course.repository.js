import CourseModel from "../models/course.model.js";

export const findAllCourse = () => CourseModel.find({deleted: false})
export const findCourseById = (id) => CourseModel.findById(id)
export const updateLearnerOfCourse = (...args) => CourseModel.findOneAndUpdate(...args)

export const adminFindCourses = () => CourseModel.find({deleted: false}).sort({createdAt: -1})
export const createCourse = (data) => CourseModel.create(data)
export const findOneAndUpdateCourse = (...args) => CourseModel.findOneAndUpdate(...args)