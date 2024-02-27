const bcrypt = require("bcrypt");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const Business = require("../Models/BusinessModel");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  try {
    const { phoneno } = req.body;
    if (phoneno == "+919999999999") {
      res.status(200).json({
        success: true,
        message: "Please Verify your OTP",
        otp: "999999",
      });
    } else if (phoneno == "+911111111111") {
      res.status(200).json({
        success: true,
        message: "Please Verify your OTP",
        otp: "111111",
      });
    } else {
      const otp = generateOTP();

      // IMP: TWILIO LOGIC TO SEND OTP

      const existingUser = await User.findOne({ phoneno });

      if (existingUser) {
        existingUser.otp = otp;
        await existingUser.save();
        res.status(200).json({
          success: true,
          message: "Please Verify your OTP",
          otp: { otp }, // to be removed
        });
      } else {
        // Create a new user instance with the otp
        const user = new User({
          phoneno,
          otp,
          isVerified: false,
        });
        await user.save();
        res.status(200).json({
          success: true,
          message: "Please Verify your OTP",
          otp: { otp }, // to be removed
        });
      }
    }
  } catch (err) {
    console.error("Error Sending OTP:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

const generateOTP = () => {
  const length = 6;
  let OTP = "";
  for (let i = 1; i <= length; ++i) {
    OTP += Math.floor(Math.random() * 10);
  }
  if (Number(String(OTP[0])) == 0) {
    generateOTP();
  } else {
    return OTP;
  }
};
// Example: Improved error handling and logging
exports.otpVerify = async (req, res) => {
  try {
    // Fetching data from user
    const phoneno = req.body.phoneno;
    const clientOTP = req.body.otp;

    // Secret Key
    const secret = process.env.JWT_SECRET;

    // Check for required is Missing
    if (!phoneno || !clientOTP) {
      return res.status(400).json({
        success: false,
        message: "Invalid request. Phone number and OTP are required.",
      });
    }

    // Check for business User
    const business = await Business.findOne({ phoneno });

    // for user
    let user = await User.findOne({ phoneno });

    // Check for User exist with valid OTP
    if (!user || user.otp !== clientOTP) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP. Please try again.",
      });
    }

    const payload = {
      phoneno: user.phoneno,
      id: user._id,
      role: user.role,
    };

    // Generate JWT token
    let token = jwt.sign(payload, secret, {
      expiresIn: "2h",
    });

    // Update user verification status
    user.token = token;
    user.isVerified = true;

    await user.save();

    // for cookie
    const options = {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // Set the token in a secure, HTTP-only cookie - Success
    res.cookie("token", token, options).status(200).json({
      success: true,
      message: "User verified successfully.",
      user,
      business: !!business, // Boolean representation of business existence
    });
  } catch (err) {
    console.error("Error verifying OTP", err);
    res.status(500).json({
      success: false,
      message: "Failed to verify OTP.",
    });
  }
};
