import { getMilestoneBySectionId } from "../repositories/milestone.repository.js";

export const getMilestones = async(req, res) => {
    const { sectionId } = req.query
    try {
        const milestones = await getMilestoneBySectionId({sectionId, deleted: false})
        res.status(200).send({
            data:{
                milestones
            }
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}