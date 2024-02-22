const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token = req.body.token || req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong, while verifying token",
    });
  }
};

exports.isBusiness = (req, res, next) => {
  try {
    if (req.user.type != "business") {
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

exports.isCustomer = (req,res, next) => {
    try {
      if (req.user.type != "customer") {
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
}
