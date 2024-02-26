const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    courserOwner: {
      type: String,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    ratingByFive: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    courseHomeImg: {
      type: String,
    },
    enrolledTotal: {
      type: Number,
    },
    category: {
      type: String,
    },
    durationWeeks: {
      type: Number,
    },
    tags: [
      {
        type: String,
      },
    ],
    transcript: {
      type: Boolean,
    },
    courseLevel: {
      type: String,
      enum: ["beginner", "intermediate", "expert"],
      defualt: "begineer",
    },
    description: {
      type: String,
      trim: true,
    },
    review: [
      {
        type: String,
      },
    ],
    courseType: {
      type: String,
      enum: ["free", "paid"],
      default: "free",
    },
    courseAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
