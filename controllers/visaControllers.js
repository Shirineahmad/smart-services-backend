const country = require("../models/countryModels");
const visa = require("../models/visaModel");

const add = async (req, res) => {
  try {
    const {
      countryName, // Assuming this is the name of the country
      documentsTitle,
      title,
      requirmentValidation,
      Entry,
      fees,
    } = req.body;

    // Find the corresponding country by name
    const selectedCountry = await country.findOne({ name: countryName });
console.log(selectedCountry);
    if (!selectedCountry) {
      return res.status(404).json({
        success: false,
        message: "Country not found",
      });
    }

    const newVisa = new visa({
      countryId: selectedCountry._id,
      countryName: selectedCountry.name,
      documentsTitle,
      requirmentValidation: {
        processTime: requirmentValidation.processTime,
        toBeAppliedBefore: requirmentValidation.toBeAppliedBefore,
        validity: requirmentValidation.validity,
        photoSize: requirmentValidation.photoSize,
        visaType: requirmentValidation.visaType,
      },
      fees: {
        generalFees: fees.generalFees,
        adultFees: fees.adultFees,
        infantFees: fees.infantFees,
        childFees: fees.childFees,
      },
      title,
      Entry,
    });

    await newVisa.save();

    res.status(200).json({
      success: true,
      message: `Visa data added successfully`,
      data: newVisa,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to add visa for country",
      error: error.message,
    });
  }
};



const getByCountryName = async (req, res) => {
const { countryName } = req.params;
console.log(countryName);
  try {
    const visas = await visa.find({ countryName });
    if (!visas) {
       res.status(400).json({
         success: false,
         message: `Unable to find visas by Country `,
         error: error,
       });
    }
    res.status(200).json({
      success: true,
      message: `visas data by country retrieved successfully`,
      data: visas,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Unable to get visas by Country `,
      error: error,
    });
  }
}; 
const getAll = async (req, res) => {
 
  try {
    const visas = await visa.find({ });
  
    res.status(200).json({
      success: true,
      message: `All visas data  retrieved successfully`,
      data: visas,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Unable to get visas by Country `,
      error: error,
    });
  }
}; 
module.exports = {add, getByCountryName,getAll  };