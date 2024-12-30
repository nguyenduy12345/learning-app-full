import {  getAllSectionByCourseId, findSectionById } from "../repositories/section.repository.js";

export const getSections = async(req, res) => {
    const { courseId, sectionId } = req.query
    try {
        if(sectionId){
            const section = await findSectionById(sectionId)
            res.status(200).send({
                data:{
                    section
                }
            })
            return
        }
        const sections = await getAllSectionByCourseId({courseId, deleted: false})
        res.status(200).send({
            data:{
                sections
            }
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}
