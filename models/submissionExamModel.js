const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SubmissionExamSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
   
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "exam",
      required: true,
    },
    urgentNumber: { type: Number, required: true },

    statusExam: {
      type: String,
      required: true,
      enum: ["pending", "accepted"],
      default: "pending",
    },
    additionalComment: { type: String },
    passport: { type: Array, required: true },
  },

  { timestamps: true }
);

const submissionExam = model("submissionExam", SubmissionExamSchema);

module.exports = submissionExam;
