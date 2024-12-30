import { Router } from "express";

import { getSections} from "../controllers/section.controller.js";

const SectionRouter = Router()

SectionRouter.get('/', getSections)

export default SectionRouter