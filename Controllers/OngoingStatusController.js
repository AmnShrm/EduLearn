const OngoingStatus = require("../Models/OngoingStatusModel");

exports.createPurchaseEntry = async (req, res) => {
  try {
    const { customerId, courseId, title, courserOwner, totalLesson } = req.body;

    const purchasedCourse = new OngoingStatus({
      customerId,
      courseId,
      title,
      courserOwner,
      totalLesson,
    });
    
    if (!customerId || !courseId || !title || !courserOwner || !totalLesson) {
      return res.status(400).json({
        success: false,
        message: "Required Entry Missing",
      });
    }

    const existCourse = await OngoingStatus.find({courseId})

    const savedPurchasedCourse = await purchasedCourse.save();
    return res.status(200).json({
      success: true,
      data: savedPurchasedCourse,
      message: "Entry Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAllOngoingStatus = async (req, res) => {
  try {
    const { customerId } = req.params;

    const fetchedData = await OngoingStatus.find({customerId});
    console.log(fetchedData);
    return res.status(200).json({
      success: true,
      data: fetchedData,
      message: `Fetched All OnGoing Course of Customer ${customerId}`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
