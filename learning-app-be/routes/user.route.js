import { Router } from "express";
import multer from "multer";

import { profile, updateInformationUser, handleChangeAvatar, getUsers, updateHeartExperienceGemDayStreakUser, handleChangePassword } from "../controllers/user.controller.js";
import { validateUpdateAvatarRequest, validateUpdateUserRequest, validateUserChangePassword } from "../validations/userRequest.validation.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const UserRouter = Router()
UserRouter.get('/profile', profile)
UserRouter.get('/', getUsers)
UserRouter.patch('/avatar', upload.single("file") , validateUpdateAvatarRequest, handleChangeAvatar)
UserRouter.patch('/update_information', validateUpdateUserRequest, updateInformationUser)
UserRouter.patch('/update_asset', updateHeartExperienceGemDayStreakUser)
UserRouter.patch('/change_password', validateUserChangePassword ,handleChangePassword)

export default UserRouter