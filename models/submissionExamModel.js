const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SubmissionExamSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    urgentNumber: { type: Number, required: true },

    statusExam: {
      type: String,
      required: true,
      enum: ["pending", "request", "accepted"],
      default: "pending",
    },
    additionalComment: { type: String },
    level: { type: String },
    institute: { type: String },
    language: { type: String },
    description: { type: String },
    passport: { type: Array, required: true },
  },

  { timestamps: true }
);

const submissionExam = model("submissionExam", SubmissionExamSchema);

module.exports = submissionExam;
