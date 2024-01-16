const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SubmissionFlightSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    destination: { type: String, required: true },
    duration: { type: String, required: true },
    startDate: { type: Date, required: true },
    statusInsurance: {
      type: String,
      enum: ["pending", "accept", "reject"],
    required: true,
    default: "pending" },
  },

  { timestamps: true }
);

const submissionFlight = model("submissionFlight", SubmissionFlightSchema);

module.exports = submissionFlight;
