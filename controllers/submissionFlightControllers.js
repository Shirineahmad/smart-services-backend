const submissionFlight = require("../models/submissionFlightModel");
const users = require("../models/userModel");
const { FileUpload } = require("../extra/uploader-file");

const add = async (req, res) => {
  console.log("Received request body:", req.body);
  try {
    const {
      userId,
      type,
      leavingFrom,
      goingTo,
      leavingDate,
      arrivingDate,
      classFlight,
      person,
      statusFlight,
      additionalComment,
    } = req.body;
    

    console.log("Received request body:", req.body);
   
   
    const userExists = await users.findById(userId);

 

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: `User with id ${userId} isn't registered`,
      });
    }
    // userExists.firstName;
   
    
    const files = req.files;
    console.log(files);
    if (!files || files.length < 1 || files.length > 3) {
      return res.status(400).json({
        success: false,
        message: `Provide between 1 to 3 images`,
      });
    }
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const uploadedFile = await FileUpload(file);
        return uploadedFile.downloadURL;
      })
    );
    const newSubmissionFlight = new submissionFlight({
      userId: userId,
      type,
      leavingFrom,
      goingTo,
      leavingDate,
      arrivingDate,
      classFlight,
        person:JSON.parse(person),
      statusFlight,
      additionalComment,
      passport: uploadedFiles,
    });

    await newSubmissionFlight.save();

    res.status(200).json({
      success: true,
      message: `SubmissionFlight data added successfully`,
      data: newSubmissionFlight, // Correct variable name
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to add SubmissionFlight",
      error: error.message,
    });
  }
};
module.exports = { add }