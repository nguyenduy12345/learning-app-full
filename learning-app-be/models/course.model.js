import mongoose from "mongoose";

import collections from "../utils/collections.js";

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    numOfLearner: {type: Number, default: 0},
    typeWritingSystem: {type: String},
    deleted: {type: Boolean, default: false}
},{
    timestamps: true
})
const CourseModel = mongoose.model(collections.COURSES, courseSchema)

export default CourseModel