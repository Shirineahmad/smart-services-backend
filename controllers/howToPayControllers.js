const payments = require("../models/howToPayModels");
const { FileUpload } = require("../extra/uploader-file");
const add = async (req, res) => {
  try {
    const { number, option, person } = req.body;
    const files = req.files;

    if (!files || files.length !== 1) {
      return res.status(400).json({
        success: false,
        message: `Provide exactly 1 image`,
      });
    }

    const uploadedFile = await FileUpload(files[0]); // Assuming you want to handle only the first file

    const newPayment = new payments({
      number,
      option,
      person,
      images: uploadedFile.downloadURL,
    });

    await newPayment.save();

    res.status(200).json({
      success: true,
      message: `Payment data added successfully`,
      data: newPayment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to add payment",
      error: error.message,
    });
  }
};
const getAll = async (req, res) => {
  try {
    const payment = await payments.find({});

    res.status(200).json({
      success: true,
      message: `All payments data  retrieved successfully`,
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Unable to get payments `,
      error: error,
    });
  }
}; 


module.exports = { add ,getAll};
