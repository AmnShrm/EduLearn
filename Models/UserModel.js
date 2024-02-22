const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    phoneno: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer", "business", "user"],
      default: "user",
    },
    otp: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
