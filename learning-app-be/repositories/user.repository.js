import UserModel from "../models/user.model.js";

export const createUser = (data) => UserModel.create(data)
export const findAllUser = (limit) => UserModel.find({
    role: { $nin: ['admin'] }
  }).select("fullName avatar experiences gems").limit(limit)
export const findAllUserId = () => UserModel.find({
  status: 2,
  role: { $nin: ['admin'] }
}).select("_id")
export const findUser = (info) => UserModel.findOne(info)
export const findOneUserByFacebookIdOrGoogleId = (info) => UserModel.findOne(info).select("-password")
export const findUserById = (id) => UserModel.findById(id).select("-password")
export const findUserByEmail = (email) => UserModel.findOne({email}).select("-password")
export const findUserAndUpdate = (...args) => UserModel.findByIdAndUpdate(...args)

export const adminFindUsers = (skip, limit, sort) => UserModel.find({
  role: { $nin: ['admin'] }
}).select("-password").skip(skip).limit(limit).sort(sort)
export const countUsers = () => UserModel.countDocuments({
  role: { $nin: ['admin'] }
})

