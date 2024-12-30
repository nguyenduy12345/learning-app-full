import MissonModel from "../models/misson.model.js";

export const createNewMisson = (data) => MissonModel.create(data)
export const findMissonById = (missonId) => MissonModel.findById(missonId)
export const findOneAndUpdateMisson = (...args) => MissonModel.findOneAndUpdate(...args)
export const findAllMisson = () => MissonModel.find({deleted: false})
export const adminFindMissons = (info) => {
    let filter = {...info}
    if(info.type){
        filter = {...info, type: info.type}
    }else{
        delete filter.type
    }
    return MissonModel.find(filter).sort({createdAt: - 1})
}