import mongoose from "mongoose";

import collections from "../utils/collections.js";

const summaryLessonSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    lessons: [
      {
        lesson: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "lessons",
        },
        wrongQuestions: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "questions",
            }
        ]
      }
    ]
  },
  {
    timestamps: true,
  }
);
const SummaryLessonModel = mongoose.model(
  collections.SUMMARYLESSONS,
  summaryLessonSchema
);

export default SummaryLessonModel;
