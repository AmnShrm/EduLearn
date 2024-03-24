const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    name: {
      type: String,
    },
    phoneno: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    courseShop: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    ongoingStatus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OngoingStatus",
      },
    ],
    certificate: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certificate",
      },
    ],
    weeklyStatus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WeeklyStatus",
      },
    ],
    interestList: [
      {
        type: String,
        maxlength: 50,
      },
    ],
    searchList: [
      {
        type: String,
        maxlength: 50,
      },
    ],
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
