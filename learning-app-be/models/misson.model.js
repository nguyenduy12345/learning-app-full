import mongoose from "mongoose";

import collections from "../utils/collections.js";

const missonSchema = new mongoose.Schema({
    misson: {type: String, required: true},
    type: {type: String, required: true},
    numberOfRequirements: {type: Number, required: true},
    experiences: {type: Number, required: true},
    gems: {type: Number, required: true},
    hearts: {type: Number, required: true},
    gifts: {type: String},
    deleted: {type: Boolean, default: false}
},{
    timestamps: true
})
const MissonModel = mongoose.model(collections.MISSONS, missonSchema)

export default MissonModel