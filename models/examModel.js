  const mongoose = require("mongoose");
  const { Schema, model } = mongoose;

  const ExamSchema = new Schema(
    {
      language: { type: String, required: true},
      institute: { type: String, required: true },
      level: { type: String, required: true },
      description: { type: Array, required: true },
    },

    { timestamps: true }
  );

  const exam = model("exam", ExamSchema);

  module.exports = exam;
