import mongoose from "mongoose";

import collections from "../utils/collections.js";

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String,  unique: true, required: true},
    password: {type: String, 
        required: function() {
            return !this.facebookId && !this.googleId
        }
    },
    role: {type: [String], default: ['user']},
    experiences: {type: Number, default: 0},
    hearts: {type: Number, default: 15},
    avatar: {type: String},
    gems: {type: Number, default: 0},
    sex: {type: Number, default: 1},
    activeDays : [String],
    status: {type: Number, default: 2},
    facebookId: {type: String, unique: true, sparse: true},
    googleId: {type:String, unique: true, sparse: true}
},{
    timestamps: true
})
const UserModel = mongoose.model(collections.USERS, userSchema)

export default UserModel
