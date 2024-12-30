import mongoose from "mongoose";

import collections from "../utils/collections.js";

const lessonSchema = new mongoose.Schema({
    name: {type: String },
    experiences: {type: Number},
    gems: {type: Number},
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sections",
        required: true,
    },
    milestoneId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "milestones",
        required: true,
    },
    questions: [
        {
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "questions",
                required: true,
            }
        }
    ],
    deleted: {type: Boolean, default: false}
},{
    timestamps: true
})
const LessonModel = mongoose.model(collections.LESSONS, lessonSchema)

export default LessonModel