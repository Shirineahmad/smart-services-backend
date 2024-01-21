// controllers/submissionVisaControllers.js
const { uploadPdf } = require("../extra/uploader-file");
const submissionVisa = require("../models/submissionVisaModel");
const users = require("../models/userModel");
const add = async (req, res) => {
  console.log("helo")
  try {
    const { userId, visaId, person, statusVisa } = req.body;
    console.log(req.body);
    
   const files = req.files;
   console.log("files", files);
    const userExists = await users.findById(userId);

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: `User with id ${userId} isn't registered`,
      });

   
    } if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: `No files uploaded`,
      });
    }


    // // Map files to the required format for the schema
    const documents = await Promise.all(
      files.map(async (file) => {
        const uploadedFile = await uploadPdf(file); // Use uploadPdf function for PDF files
        return {
          name: uploadedFile.name,
          files: [uploadedFile.downloadURL],
        };
      })
    );

    // Create a new submissionVisa instance
    const newSubmission = new submissionVisa({
      userId,
      visaId,
      person: JSON.parse(person),
      documents,
      statusVisa,
    });

    // Save the new submission to the database
    await newSubmission.save();

    // Send a response to the client
    res.status(200).json({
      message: "Document submitted successfully",
      data: newSubmission,
    });
  } catch (error) {
    console.error("Error submitting document:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { add };
