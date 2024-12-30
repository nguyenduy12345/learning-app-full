import mongoose from "mongoose";

import collections from "../utils/collections.js";

const learningProcessSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
    recentAccessAt: {
      type: Date,
      default: Date.now,
    },
    totalSection: {type: Number, default: 0},
    totalSectionDone: {type: Number, default: 0},
    status: {type: Number, default: 0},
    sections: [
      {
        sectionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "sections",
        },
        status: { type: Number, default: 0},
        totalMilestone: {type: Number, default: 0},
        totalMilestoneDone: {type: Number, default: 0},
        milestones: [
          {
            milestoneId: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: "milestones"
            },
            currentLessonId: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: "lessons"
            },
            currentLesson: {type: Number, default: 0},
            totalLesson: {type: Number, default: 0},
            totalLessonDone: {type: Number, default: 0},
            status: {type: Number, default: 0},
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);
const LearningProcessModel = mongoose.model(
  collections.LEARNINGPROCESSES,
  learningProcessSchema
);

export default LearningProcessModel;
