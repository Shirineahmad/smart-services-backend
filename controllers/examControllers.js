const exams = require("../models/examModel");

const add = async (req, res) => {
  try {
    const { language, title, institute, level, description } = req.body;
    
      const newExam = new exams({
      language,
      title,
      institute,
      level,
      description,
    });

    await newExam.save();

    res.status(200).json({
      success: true,
      message: `Exam data added successfully`,
      data: newExam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to add exam",
      error: error.message,
    });
  }
};

const getByLanguage = async (req, res) => {
  const { language } = req.params;
  console.log(language);
  try {
    const exam = await exams.find({ language });
    if (!exam) {
      res.status(400).json({
        success: false,
        message: `Unable to find exam by language `,
        error: error,
      });
    }
    res.status(200).json({
      success: true,
      message: `exam data by language retrieved successfully`,
      data: exam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Unable to get exam by language `,
      error: error,
    });
  }
}; 
const getByInstitute = async (req, res) => {
  const { institute } = req.params;

  try {
    const exam = await exams.find({ institute });
    if (!exam) {
      res.status(400).json({
        success: false,
        message: `Unable to find exam by institute `,
        error: error,
      });
    }
    res.status(200).json({
      success: true,
      message: `exam data by institute retrieved successfully`,
      data: exam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Unable to get exam by language `,
      error: error,
    });
  }
}; 
const getByLevel = async (req, res) => {
  const { level } = req.params;
  
  try {
    const exam = await exams.find({ level });
    if (!exam) {
      res.status(400).json({
        success: false,
        message: `Unable to find exam by level `,
        error: error,
      });
    }
    res.status(200).json({
      success: true,
      message: `exam data by level retrieved successfully`,
      data: exam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Unable to get exam by level `,
      error: error,
    });
  }
}; 
const getAll= async (req, res) => {

  try {
    const exam = await exams.find({  });
  
    res.status(200).json({
      success: true,
      message: ` All exam data retrieved successfully`,
      data: exam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Unable to get  all exam  `,
      error: error,
    });
  }
}; 







module.exports = { add, getByLanguage, getByLevel, getByInstitute, getAll };