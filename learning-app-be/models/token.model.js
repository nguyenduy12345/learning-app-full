import mongoose from "mongoose";

import collections from "../utils/collections.js";
const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    token: {
        type: String,
        required: true,      
    },
    expirationDate: {
        type: Date,
        expires: '30d'
    }  
},{
    timestamps: true
})
const TokenModel = mongoose.model(collections.TOKENS, tokenSchema)

export default TokenModel