const express = require("express");
const router = express.Router();

const Category = require("../Controllers/CategoryController");
const Auth = require("../Middleware/Auth");

router.get("/getAllCategory", Category.getAllCategory);
router.get("/getCategoryList", Category.getAllCategoriesNames);

router.post("/createCategory", Category.createCategory);
module.exports = router;
