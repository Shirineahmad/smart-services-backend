const services = require("../models/servicesModel");
const { FileUpload } = require("../extra/uploader-file");
const add = async (req, res) =>{
  try {
    const {
        name,
        description
    } = req.body;
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
    const newService = new services({
      name,
      description,
      images: uploadedFiles,
    });

    await newService.save();

    res.status(200).json({
        success: true,
        message: `Service data added successfully`,
        data: newService,
    });
} catch (error) {
   
    res.status(500).json({
        success: false,
        message: "Unable to add service",
        error: error.message,
    });
}
}
const getByName = async (req, res) => {
 
    const { name } = req.params;

   try {
    const service = await services.find({ name });
    if (!service) {
      res.status(400).json({
        success: false,
        message: `Unable to find service name `,
        error: error,
      });
    }
    res.status(200).json({
      success: true,
      message: `service data retrieved successfully`,
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Unable to get service  `,
      error: error,
    });
  }
}; 

const getAll = async (req, res) => {
  try {
    const service = await services.find({});

    res.status(200).json({
      success: true,
      message: `All services data  retrieved successfully`,
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Unable to get services `,
      error: error,
    });
  }
}; 


module.exports = { add, getByName, getAll };