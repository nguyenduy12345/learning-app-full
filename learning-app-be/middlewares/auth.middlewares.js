import jwt from 'jsonwebtoken'
import { findUserById } from '../repositories/user.repository.js';
import formatDate from '../functions/formatDate.js';
const authMiddleware = {
    authentication: async (req, res, next) => {
      const authToken = req.headers['authorization']
      try {
        const token = authToken && authToken.split(' ')[1]
        if(!token) throw new Error(req.translate("user.isLogin"))
        const verifyToken = jwt.verify(token, process.env.ACCESS_TK_KEY)
        const { _id } = verifyToken
        const user = await findUserById(_id)
        if(!user) throw new Error('Unauthorized')
        if(user.status === 0) throw new Error(req.translate('user.banned'))
        req.currentUser = user
        next()
      } catch (error) {
        res.status(401).send({
            message: error.message
        })
      }
    },
    authorization: async (req, res, next) => {
      const {role} = req.currentUser
      try {
        if(role.includes('admin')){
          next()
        }else{
          throw new Error("Unauthorization")
        }
      } catch (error) {
        res.status(401).send({
            message: error.message
        })
      }
    }
};
export default authMiddleware;