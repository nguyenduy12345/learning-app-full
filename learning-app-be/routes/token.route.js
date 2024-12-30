import { Router } from "express";

import { getTokenByUserId } from "../controllers/token.controller.js";

const TokenRouter = Router()

TokenRouter.get('/', getTokenByUserId)

export default TokenRouter