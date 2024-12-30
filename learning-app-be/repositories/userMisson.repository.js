import UserMissonModel from "../models/userMisson.model.js";

export const findMissonsByUserId = (info) => UserMissonModel.find(info).sort({completed: 1}).populate('missonId')
export const creatNewMissonOfUser = (data) => UserMissonModel.create(data)
export const findOneMissonByUserIdAndMissonId = (info) => UserMissonModel.findOne(info)