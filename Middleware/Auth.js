const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    // Fetching Token
    const token = req.body.token || req.cookies.token;

    // Token Missing?
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      // Verify Token
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next();
    } catch (err) {
      console.error("Token Verification Error:", err);
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (err) {
    console.error("Authentication Error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying token",
    });
  }
};

exports.isBusiness = (req, res, next) => {
  try {
    if (req.user.role != "business") {
      return res.status(401).json({
        success: false,
        message: "This is the Protected route for Seller",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User type is not matching",
    });
  }
};

exports.isCustomer = (req, res, next) => {
  try {
    if (req.user.role != "customer") {
      return res.status(401).json({
        success: false,
        message: "This is the Protected route for Customer",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User type is not matching",
    });
  }
};
