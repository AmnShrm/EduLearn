const SubCategory = require("../Models/SubCategoryModel");
const Category = require("../Models/CategoryModel");

exports.createSubCategory = async (req, res) => {
  try {
    const { name, description, category, tags, popularTopics } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Required Entry Missing",
      });
    }

    const existSubCategory = await SubCategory.findOne({ name });

    if (existSubCategory) {
      return res.status(400).json({
        success: false,
        message: "Sub-category already exist",
      });
    }

    const subCategory = new SubCategory({
      name,
      description,
      category,
      tags,
      popularTopics,
    });

    const savedCategory = await subCategory.save();

    await Category.findByIdAndUpdate(
      category,
      {
        $push: { subcategory: savedCategory._id },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: savedCategory,
      message: "Sub-Category Added Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.getAllSubCategory = async (req, res) => {
  try {
    const allSubCategory = await SubCategory.find({});

    return res.status(200).json({
      success: true,
      data: allSubCategory,
      message: "Fetched Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.getAllSubCategoryList = async (req, res) => {
  try {
    const allSubCategory = await SubCategory.find({}, "name");

    return res.status(200).json({
      success: true,
      data: allSubCategory,
      message: "Fetched Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
