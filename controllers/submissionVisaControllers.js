const { uploadPdf } = require("../extra/uploader-file");
const submissionVisa = require("../models/submissionVisaModel");
const users = require("../models/userModel");
const add = async (req, res) => {
  console.log("Received request body:", req.body);
  try {
    const { userId, visaId, person, statusVisa } = req.body;

    console.log("Received request body:", req.body);

    const userExists = await users.findById(userId);

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: `User with id ${userId} isn't registered`,
      });
    }
    const singleFile = req.file;
    console.log(file);
    if (!file) {
      return res.status(400).json({
        success: false,
        message: `Provide between 1 to 3 images`,
      });
    }

    const uploadedFile = await FileUpload(singleFile);
    const downloadURL = uploadedFile.downloadURL;
    const name = uploadedFile.originalname;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: `Provide between 1 to 3 PDF files`,
      });
    }
    // const pdfFiles = await Promise.all([
    //   (async () => {
    //     const uploadedFile = await uploadPdf(file);
    //     const name = uploadedFile.originalname;
    //     const downloadURL = uploadedFile.downloadURL;
    //     return { name, downloadURL };
    //   })(),
    // ]);

    const newSubmissionVisa = new submissionVisa({
      userId: userId,
      visaId,
      person: JSON.parse(person),
      statusVisa,
      documents: {name,downloadURL},
    });

    await newSubmissionVisa.save();
    console.log("response", await newSubmissionVisa.save());
    console.log("newSubmissionVisa", newSubmissionVisa);

    console.log("res", res);
    res.status(200).json({
      success: true,
      message: `submissionVisa data added successfully`,
      data: newSubmissionVisa,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to add SubmissionVisa",
      error: error.message,
    });
  }
};
const getSubmissionByUser = async (req, res) => {
  let userId; // Move the declaration outside the try block
  try {
    userId = req.params.userId; // userId is defined here
    console.log(userId);
    const submissionVisas = await submissionVisa
      .find({ userId })
      .populate("userId");

    console.log(submissionVisas.length);

    if (submissionVisas.length > 0) {
      res.status(200).json({
        success: true,
        message: `submissionVisas for user with ID ${userId} retrieved successfully`,
        data: submissionVisas,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No submissionVisas found for user with ID ${userId}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to get submissionVisas for the user with ID ${userId}`,
      error: error.message,
    });
  }
};
const updateById = async (req, res) => {
  try {
    const { submissionVisaId } = req.params;

    const updatedFields = {};

    if (req.body.hasOwnProperty("statusVisa")) {
      updatedFields.statusVisa = req.body.statusVisa;
    }

    const updatedSubmissionVisa = await submissionVisa.findByIdAndUpdate(
      submissionVisaId,
      updatedFields,
      {
        new: true,
      }
    );

    if (updatedSubmissionVisa) {
      res.status(200).json({
        success: true,
        message: `submissionVisa with ID ${submissionVisaId} updated successfully`,
        data: updatedSubmissionVisa,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `submissionVisa with ID ${submissionVisaId} not found`,
      });
    }
  } catch (error) {
    console.error("Error updating submissionVisa:", error); // Log the error details
    res.status(500).json({
      success: false,
      message: "Unable to update submissionVisa",
      error: error.message,
    });
  }
};
const getAll = async (req, res) => {
  try {
    const submissionVisas = await submissionVisa.find().populate("userId");

    console.log(submissionVisas.length);

    if (submissionVisas.length > 0) {
      res.status(200).json({
        success: true,
        message: `submissionVisas retrieved successfully`,
        data: submissionVisas,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No submissionVisas `,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to get submissionVisas `,
      error: error.message,
    });
  }
};
module.exports = { add, getSubmissionByUser, updateById, getAll };
