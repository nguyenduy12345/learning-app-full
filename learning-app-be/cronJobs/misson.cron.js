import cron from "node-cron"
import sendMissonToUser from "../services/sendMissonToUser.js"

export const sendMisson = () => {
    cron.schedule('0 8 * * *', () => {
       sendMissonToUser()
       console.log('Gửi nhiệm vụ thành công')
    });
}