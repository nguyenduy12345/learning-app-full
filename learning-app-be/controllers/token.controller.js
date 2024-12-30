import { findTokenByUserId, createNewTokenByUserId } from "../repositories/token.repository.js";

export const getTokenByUserId = async (req, res) => {
    const userId = req.query
    try {
        
    } catch (error) {
        
    }
}
export const createToken = async(req, res) => {
    const { _id, token } = req.token
    try {
        const findToken = await findTokenByUserId({userId: _id})
        if(findToken){
            findToken.token = token
            await findToken.save()
            res.status(201).send({
                message: "Done"
            })
            return
        }
        await createNewTokenByUserId({userId: _id, token})
        res.status(201).send({
            message: "Done"
        })
    } catch (error) {
        res.status(401).send({
            message: error.message
        })
    }
}