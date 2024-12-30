import mongoose from "mongoose";

import collections from "../utils/collections.js";

const userMissonSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    missonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "missons",
      required: true
    },
    currentProgress: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
userMissonSchema.index({userId: 1})

const UserMissonModel = mongoose.model(
  collections.USERMISSONS,
  userMissonSchema
);

export default UserMissonModel;
