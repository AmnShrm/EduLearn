const Customer = require("../Models/CustomerModel");
const User = require("../Models/UserModel");

exports.createCustomer = async (req, res) => {
  try {
    // taking phone no from DB
    const { phoneno } = req.user;

    // taking data from user
    const { firstName, lastName, email, location } = req.body;

    // check for entry missing
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: "Required Entry Missing",
      });
    }

    
    const existEmail = await Customer.findOne({ email });
    const existPhone = await Customer.findOne({ phoneno });

    // check for existing phone no
    if (existPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone no already Exist",
      });
    }

    // check for existing mail id
    if (existEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already Exist",
      });
    }

    // creating new customer
    const customer = new Customer({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      phoneno,
      email,
      location,
    });

    // Save the customer to the database
    await customer.save();

    // Changing the role of user to verified customer
    await User.findOneAndUpdate({ phoneno }, { role: "customer" });

    // return positive response
    return res.status(200).json({
      success: true,
      data: customer,
      message: "Customer Created Successfully",
    });
  } catch (err) {
    console.error("Error creating customer:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
