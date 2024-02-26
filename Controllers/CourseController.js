const Course = require("../Models/CourseModel");

exports.createCourse = async (req, res) => {
  try {
    // getting data from user
    const {
      courseId,
      courserOwner,
      title,
      durationWeeks,
      transcript,
      courseLevel,
      category,
      tags,
      description,
      courseType,
      courseAmount,
    } = req.body;

    if (!courseId || !courserOwner || !title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Required Data Missing",
      });
    }

    const existCourseId = await Course.findOne({ courseId });

    if (existCourseId) {
      return res.status(401).json({
        success: false,
        message: "Course Id already present, Try another one!!",
      });
    }

    const existCourseTitle = await Course.findOne({ title });

    if (existCourseTitle) {
      return res.status(401).json({
        success: false,
        message: "Course Title already present, Try another one!!",
      });
    }


    const course = new Course({
      courseId,
      courserOwner,
      title,
      durationWeeks,
      transcript,
      courseLevel,
      category,
      tags,
      description,
      courseType,
      courseAmount,
    });

    await course.save();

    res.status(200).json({
      success: true,
      data: course,
      message: "Course Added Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,

      message: "Internal Server Error",
    });
  }
};

exports.getAllCourse = async (req, res, next) => {
  try {
    const courses = await Course.find({});
    return res.status(200).json({
      success: true,
      data: courses,
      message: "Data Fetched Successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};
