import {Router } from "express"
import { getGlyphsAndAlphabet } from "../controllers/glyphsAndAlphabet.controller.js"

const GlyphsAndAlphabetRouter = Router()

GlyphsAndAlphabetRouter.get('/', getGlyphsAndAlphabet)

export default GlyphsAndAlphabetRouter