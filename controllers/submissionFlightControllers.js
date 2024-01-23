const { uploadPdf } = require("../extra/uploader-file");
const submissionFlight = require("../models/submissionFlightModel");
const users = require("../models/userModel");
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

    const files = req.files;
    console.log(files);

    if (!files || files.length < 1 || files.length > 3) {
      return res.status(400).json({
        success: false,
        message: `Provide between 1 to 3 PDF files`,
      });
    }

    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const uploadedFile = await uploadPdf(file); // Use uploadPdf function for PDF files
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
      person: JSON.parse(person),
      statusFlight,
      additionalComment,
      passport: uploadedFiles,
    });
    
    await newSubmissionFlight.save(); 
    console.log("response", response)
    console.log("res",res)
    res.status(200).json({
      success: true,
      message: `SubmissionFlight data added successfully`,
      data: newSubmissionFlight,
    });
  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: "Unable to add SubmissionFlight",
      error: error.message,
    });
  }
};
const getSubmissionByUser = async (req, res) => {
  let userId; // Move the declaration outside the try block
  try {
    userId = req.params.userId; // userId is defined here
    console.log(userId);
    const submissionFlights = await submissionFlight
      .find({ userId })
      .populate("userId");

    console.log(submissionFlights.length);

    if (submissionFlights.length > 0) {
      res.status(200).json({
        success: true,
        message: `submissionFlights for user with ID ${submissionFlights.userId} retrieved successfully`,
        data: submissionFlights,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No submissionFlights found for user with ID ${userId}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to get submissionFlights for the user with ID ${userId}`,
      error: error.message,
    });
  }
};
const updateById = async (req, res) => {
  try {
    const { submissionFlightId } = req.params;

    const updatedFields = {};

    if (req.body.hasOwnProperty("statusFlight")) {
      updatedFields.statusFlight = req.body.statusFlight;
    }

    const updatedSubmissionFlight = await submissionFlight.findByIdAndUpdate(
      submissionFlightId,
      updatedFields,
      {
        new: true,
      }
    );

    if (updatedSubmissionFlight) {
      res.status(200).json({
        success: true,
        message: `submissionFlight with ID ${submissionFlightId} updated successfully`,
        data: updatedSubmissionFlight,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `submissionFlight with ID ${submissionFlightId} not found`,
      });
    }
  } catch (error) {
    console.error("Error updating submissionFlight:", error); // Log the error details
    res.status(500).json({
      success: false,
      message: "Unable to update submissionFlight",
      error: error.message,
    });
  }
};
const getAll = async (req, res) => {
  try {
    const submissionFlights = await submissionFlight.find().populate("userId");

    console.log(submissionFlights.length);

    if (submissionFlights.length > 0) {
      res.status(200).json({
        success: true,
        message: `submissionFlights retrieved successfully`,
        data: submissionFlights,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No submissionFlights `,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to get submissionFlights `,
      error: error.message,
    });
  }
};
module.exports = { add, getSubmissionByUser, updateById, getAll };
