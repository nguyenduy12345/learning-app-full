import mongoose from "mongoose";

import collections from "../utils/collections.js";

const questionSchema = new mongoose.Schema(
  {
    type: { type: String,},
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true
    },
    question: { type: String,},
    answers: {
        type: [String]
    },
    correctChoose: { type: Number },
    leftOptions : [String],
    rightOptions : [String],
    correctMatches: {
      type: [{ left: String, right: String }],
    },
    document: {type: String},
    words: {type: [String]},
    correctDocument: {type: Array},
    countCorrect: {type: Number},
    deleted: {type: Boolean, default: false}
  },
  {
    timestamps: true,
  }
);

questionSchema.index({courseId: 1, type: 1})

const QuestionModel = mongoose.model(collections.QUESTIONS, questionSchema);

export default QuestionModel;
