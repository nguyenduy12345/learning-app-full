import { findMissonsByUserId, findOneMissonByUserIdAndMissonId } from "../repositories/userMisson.repository.js";

export const getMissonsByUserId = async(req, res) => {
    const { _id } = req.currentUser
    try {
        const missons = await findMissonsByUserId({userId: _id})
        res.status(200).send({
            data: {missons}
        })
    } catch (error) {
        res.status(401).send({
            message: error.message
        })
    }
}
export const getMissonAndUpdateCurrentGressStatus = async(req, res) => {
    const { _id } = req.currentUser
    const { missonId } = req.query
    const { currentProgress, status } = req.body
    try {
        const misson = await findOneMissonByUserIdAndMissonId({
            userId: _id,
            missonId
        })
        if(!misson) throw new Error(req.translate("validation.update.failed",{
            field: req.translate("misson.currentGress")
        }))
        if(misson.type === 'days'){
            misson.currentProgress = misson.currentProgress + +currentProgress
            misson.completed = status
            await misson.save()
            res.status(201).send({
                message: req.translate("validation.update.success",{
                    field: req.translate("misson.status")
                })
            })
            return
        }
        misson.currentProgress = +misson.currentProgress + +currentProgress
        misson.completed = status
        await misson.save()
        res.status(201).send({
            message: req.translate("validation.update.success",{
                field: req.translate("misson.status")
            })
        })
    } catch (error) {
        res.status(401).send({
            message: error.message
        })
    }
}