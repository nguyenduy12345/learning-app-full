import SectionModel from "../models/section.model.js";

export const getAllSectionByCourseId = (info) => SectionModel.find(info)
export const findSectionById = (id) => SectionModel.findById(id)
export const createNewSectionWithCoureId = (data) => SectionModel.create(data)

export const adminFindSectionByCourseId = (info) => SectionModel.find(info).sort({createdAt: 1})
export const createSection = (data) => SectionModel.create(data)
export const findOneAndUpdateSection = (...args) => SectionModel.findOneAndUpdate(...args)