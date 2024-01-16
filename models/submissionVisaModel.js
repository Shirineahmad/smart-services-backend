const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SubmissionExamSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    visaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "visa",
      required: true,
    },
    person: {
      child: { type: Number },
      adult: { type: Number },
      infant: { type: Number },
    },
    documents: [
      {
        name: { type: string },
        files: { type: Array },
      },
    ],
    statusVisa: {
      type: string,
      required: true,
      enum: ["pending", "accepted","rejected"],//has more 7
      default: "pending",
    }, 
  },

  { timestamps: true }
);

const submissionExam = model("submissionExam", SubmissionExamSchema);

module.exports = submissionExam;
