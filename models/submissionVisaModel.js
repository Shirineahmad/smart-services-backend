const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SubmissionVisaSchema = new Schema(
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
        name: { type: String },
        files: { type: Array },
      },
    ],
    statusVisa: {
      type: String,
      required: true,
      enum: ["pending", "accepted","rejected"],//has more 7
      default: "pending",
    }, 
  },

  { timestamps: true }
);

const submissionVisa = model("submissionVisa", SubmissionVisaSchema);

module.exports = submissionVisa;
