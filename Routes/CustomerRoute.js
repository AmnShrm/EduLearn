const express = require("express");
const router = express.Router();

const Customer = require("../Controllers/CustomerController");
const Auth = require("../Middleware/Auth");


router.post("/createCustomer", Auth.auth, Customer.createCustomer);

module.exports = router;
