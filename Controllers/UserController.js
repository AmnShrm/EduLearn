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

exports.otpVerify = async (req, res) => {
  try {
    const phoneno = req.body.phoneno;
    const clientOTP = req.body.otp;
    const secret = process.env.JWT_SECRET;

    if (!phoneno || !clientOTP) {
      res.status(500).json({
        success: false,
        message: "Required Data Missing",
      });
    }

    let temp = false;
    const business = await Business.findOne({ phoneno });
    if (business) {
      temp = true;
    } else {
      temp = false;
    }
    console.log(secret);

    const user = await User.findOne({ phoneno });

    if (phoneno == "+911111111111" && user.otp === clientOTP) {
      user.isVerified = true;
      await user.save();
      const token = jwt.sign({ user }, secret);
      res.cookie("token", token, {
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "verified",
        token,
        business: temp
      });
    }else if( phoneno == "+919999999999" && user.otp === clientOTP) {
      user.isVerified = true;
      await user.save();
      const token = jwt.sign({ user }, secret);
      res.cookie("token", token, {
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: "verified",
        token,
      });
    } else {
      if( user && user.otp === clientOTP ){
        user.otp = undefined;
        user.isVerified = true;
        await user.save();
        const token = jwt.sign({ user }, secret);
        res.cookie("token", token, {httpOnly: true})
        res.status(200).json({
          success:true,
          message: "verified",
          token,
        })
      }else{
        res.status(400).json({
          success: false,
          message: "Invalid OTP. Please try again."
        })
      }
    }
  } catch (err) {
    console.error("Error verifying OTP", err);
    res.status(500).json({
      success:false,
      message: "Failed to verify OTP."
    })
  }
};
 