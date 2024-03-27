const Category = require("../Models/CategoryModel");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Required category name missing",
      });
    }

    const existName = await Category.findOne({ name });

    if (existName) {
      return res.status(401).json({
        success: false,
        message: "Category Already Exist",
      });
    }

    const category = await Category.create({
      name,
      description,
    });

    return res.status(200).json({
      success: true,
      data: category,
      message: "New Category Added",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find({});
    return res.status(200).json({
      success: true,
      data: allCategory,
      message: "Fetching all the Category",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllCategoriesNames = async (req, res) => {
  try {
    const categories = await Category.find({}, "name");

    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found.",
      });
    }

    const categoryNames = categories.map((category) => category.name);

    res.status(200).json({
      success: true,
      data: categoryNames,
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
