import MilestoneModel from "../models/milestone.model.js"

export const getMilestoneBySectionId = (sectionId) => MilestoneModel.find(sectionId)
export const getMilestoneById = (id) => MilestoneModel.findById(id)

export const adminFindMilestoneBySectionId = (info) => MilestoneModel.find(info).sort({createdAt: 1})
export const createMilestone = (data) => MilestoneModel.create(data)
export const findOneAndUpdateMilestone = (...args) => MilestoneModel.findOneAndUpdate(...args)
