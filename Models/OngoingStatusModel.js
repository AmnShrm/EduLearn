const mongoose = require("mongoose");

const OngoingStatusSchema = mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    courserOwner: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true
    },
    totalLesson: {
      type: Number,
      default: 0,
    },
    seenLesson: {
      type: Number,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

const OngoingStatus = mongoose.model("OngoingStatus", OngoingStatusSchema);
module.exports = OngoingStatus;
