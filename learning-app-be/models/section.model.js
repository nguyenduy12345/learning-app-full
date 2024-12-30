import mongoose from "mongoose";

import collections from "../utils/collections.js";

const sectionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
        required: true,
    },
    deleted: {type: Boolean, default: false}
},{
    timestamps: true
})
const SectionModel = mongoose.model(collections.SECTIONS, sectionSchema)

export default SectionModel