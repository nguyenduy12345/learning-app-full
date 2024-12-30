import mongoose from "mongoose";

import collections from "../utils/collections.js";

const mileStoneSchema = new mongoose.Schema({
    name: {type: String, required: true},
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sections",
        required: true,
    },
    deleted: {type: Boolean, default: false}
},{
    timestamps: true
})
const MilestoneModel = mongoose.model(collections.MILESTONES, mileStoneSchema)

export default MilestoneModel