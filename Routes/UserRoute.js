const express = require("express");
const router = express.Router();

const { otpVerify, registerUser } = require("../Controllers/UserController");

router.post("/auth/login", otpVerify);
router.post("/auth/signup", registerUser);

module.exports = router;
