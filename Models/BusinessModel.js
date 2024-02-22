const mongoose = require("mongoose");

const BusinessSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    phoneno: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
  },
  { timestamp: true }
);

BusinessSchema.pre("save", function (next) {
  this.username = this.username.toLowerCase();
  next();
});

const Business = mongoose.model("Business", BusinessSchema);
module.exports = Business;
