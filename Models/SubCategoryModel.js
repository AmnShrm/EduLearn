const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    popularTopics: [
      {
        type: String,
      },
    ],
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subcategory", SubCategorySchema);
