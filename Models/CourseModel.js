const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    courserOwner: {
      type: String,
      required: true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
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
      defualt: "beginner",
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
