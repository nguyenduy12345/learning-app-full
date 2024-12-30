import TokenModel from "../models/token.model.js";

export const findTokenByUserId = (userId) => TokenModel.findOne(userId)
export const createNewTokenByUserId = (data) => TokenModel.create(data)