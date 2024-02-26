const express = require("express");
const router = express.Router();

const Course = require("../Controllers/CourseController");
const Auth = require("../Middleware/Auth")

router.get("/getAllCourse",Auth.auth, Course.getAllCourse);

router.post("/createCourse", Course.createCourse);
module.exports = router;
 