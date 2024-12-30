import { OAuth2Client } from "google-auth-library";
const client_id = process.env.CLIENT_ID_GOOGLE
const client = new OAuth2Client(client_id)

const verifyTokenGoogle = async(token)=>{
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: client_id
    })
    const payload = ticket.getPayload()
    return payload
}
export default verifyTokenGoogle