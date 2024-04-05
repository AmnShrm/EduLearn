const express = require("express");
const router = express.Router();

const SubCategory = require("../Controllers/SubCategoryController");
const Auth = require("../Middleware/Auth");

router.post("/createSubCategory", SubCategory.createSubCategory);
router.get("/getAllSubCategory", SubCategory.getAllSubCategory);

router.get("/getAllSubCategoryList", SubCategory.getAllSubCategoryList);

module.exports = router;
