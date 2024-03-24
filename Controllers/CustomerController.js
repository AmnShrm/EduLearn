const Customer = require("../Models/CustomerModel");

exports.createCustomer = async (req, res) => {
  try {
    const { phoneno } = req.user;
    const { firstName, lastName, email, location } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: "Required Entry Missing",
      });
    }

    const existEmail = await Customer.findOne({ email });
    const existPhone = await Customer.findOne({phoneno});

    if (existPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone no already Exist",
      });
    }

    if (existEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already Exist",
      });
    }

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
