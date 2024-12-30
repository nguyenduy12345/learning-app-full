import { Router } from "express"

import { getMissonsByUserId, getMissonAndUpdateCurrentGressStatus } from "../controllers/userMisson.controller.js"

const UserMissonRouter = Router()

UserMissonRouter.get('/', getMissonsByUserId)
UserMissonRouter.patch('/update', getMissonAndUpdateCurrentGressStatus)

export default UserMissonRouter