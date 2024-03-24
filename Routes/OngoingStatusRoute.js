const express = require("express");
const router = express.Router();

const OngoingStatus = require("../Controllers/OngoingStatusController");
const Auth = require("../Middleware/Auth");

router.post("/createOngoing", OngoingStatus.createPurchaseEntry);
router.get(
  "/getAllOngoingStatus/:customerId",
  OngoingStatus.getAllOngoingStatus
);

module.exports = router;
