const express = require("express");
const router = express.Router();

const Course = require("../Controllers/CourseController");
const Auth = require("../Middleware/Auth");

router.get("/getAllCourse",  Course.getAllCourse);
router.get("/getCourseById/:courseId", Auth.auth, Course.getCourseById);

router.post("/createCourse", Course.createCourse);
module.exports = router;
