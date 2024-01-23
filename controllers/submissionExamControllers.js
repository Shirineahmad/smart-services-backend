const submissionExam = require("../models/submissionExamModel");
const users = require("../models/userModel");
const { uploadPdf } = require("../extra/uploader-file");
// const { name } = require("../config/firebase");

const add = async (req, res) => {
  try {
    const { userId, level,institute,language,description, urgentNumber, statusExam, additionalComment } =
      req.body;
    console.log("Received request body:", req.body);
    
    console.log("userId", userId);
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

    
    const newSubmissionExam = new submissionExam({
      userId: userId,
     level,institute,language,description,
      urgentNumber,
      statusExam,
      additionalComment,
      passport: uploadedFiles,
    });

    await newSubmissionExam.save();

    res.status(200).json({
      success: true,
      message: `SubmissionExam data added successfully`,
      data: newSubmissionExam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to add SubmissionExam",
      error: error.message,
    });
  }
};
const getSubmissionByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const submissionExams = await submissionExam.find({ userId: userId })
     .populate("userId");
      
    console.log(submissionExams.length);

    if (submissionExams.length > 0) {
      res.status(200).json({
        success: true,
        message: `Exam for user with ID ${submissionExams.userId} retrieved successfully`,
        data: submissionExams,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No Exam found for user with ID ${userId}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to get Exam for the user with ID ${userId}`,
      error: error.message,
    });
  }
};
const updateById = async (req, res) => {
  try {
    const { submissionExamId } = req.params;
    const { statusExam } = req.body;

    const updatedFields = {};

    if (statusExam) updatedFields.statusExam = statusExam;

    const updatedSubmissionExam = await submissionExam.findByIdAndUpdate(
      submissionExamId,
      updatedFields,
      {
        new: true,
      }
    );

    if (updatedSubmissionExam) {
      res.status(200).json({
        success: true,
        message: `submissionExam with ID ${submissionExamId} updated successfully`,
        data: updatedSubmissionExam,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `SubmissionExam with ID ${submissionExamId} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update SubmissionExam",
      error: error.message,
    });
  }
};
const getAll = async (req, res) => {
  try {
    const submissionExams = await submissionExam.find().populate("userId").populate("examId");

    console.log(submissionExams.length);

    if (submissionExams.length > 0) {
      res.status(200).json({
        success: true,
        message: `submissionFlights retrieved successfully`,
        data: submissionExams,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No submissionExams `,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to get submissionExams `,
      error: error.message,
    });
  }
};

module.exports = { add, getSubmissionByUser, updateById, getAll };
