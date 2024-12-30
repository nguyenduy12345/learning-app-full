import GlyphsAndAlphabetModel from "../models/glyphsandalphabet.model.js";

export const findGlyphsAndAlphabetByCourseId = (courseId) => GlyphsAndAlphabetModel.findOne(courseId)