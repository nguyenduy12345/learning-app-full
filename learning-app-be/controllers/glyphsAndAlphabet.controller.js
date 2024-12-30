import { findGlyphsAndAlphabetByCourseId } from "../repositories/glyphsandalphabet.repository.js";
export const getGlyphsAndAlphabet = async(req, res) => {
    const { courseId } = req.query
    try {
        const glyphsAndAlphabet = await findGlyphsAndAlphabetByCourseId({courseId})
        res.status(200).send({
            data:{
                glyphsAndAlphabet
            }
        })    
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}
