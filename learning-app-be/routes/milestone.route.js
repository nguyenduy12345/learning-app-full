import { Router } from "express";
import { getMilestones } from "../controllers/milestone.controller.js";
const MilestoneRouter = Router()

MilestoneRouter.get('/', getMilestones)

export default MilestoneRouter