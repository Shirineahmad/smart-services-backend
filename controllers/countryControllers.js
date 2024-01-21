const country = require("../models/countryModels");
const add = async (req, res) => {
  try {
      const { name, countryDescription } = req.body;
       const newCountry = new country({
           name,
           countryDescription,
       });

       await newCountry.save();

       res.status(200).json({
         success: true,
         message: `Country data added successfully`,
         data: newCountry,
       });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to add country",
      error: error.message,
    });
  }
};
const getByName = async (req, res) => {
  const { countryName } = req.params;
  console.log(countryName);
  try {
    const foundCountry = await country.findOne({ name: countryName });

    if (!foundCountry) {
      return res.status(404).json({
        success: false,
        message: `Country not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Country retrieved successfully`,
      data: foundCountry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Unable to get country by name`,
      error: error.message,
    });
  }
};
module.exports = { add, getByName };
