const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SubmissionFlightSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: String,
      enum: ["One Way", "Round Trip", "Multi City"],
      required: true,
      default: "Round Trip",
    },

    leavingFrom: { type: String, required: true },
    goingTo: { type: String, required: true },
    leavingDate: { type: Date, required: true },
    arrivingDate: { type: Date, required: true },
    classFlight: {
      type: String,
      enum: ["Economy", "First", "Buissnes", "Buissnes Economy"],
      default: "Economy",
      required: true,
    },
    passport: { type: Array, required: true },
    person: {
      Child: {
        type: Number,
        validate: {
          validator: function (value) {
            return value >= 0; // Check if child is non-negative
          },
          message: "Child must be a non-negative number.",
        },
      },
      Adult: {
        type: Number,
        validate: {
          validator: function (value) {
            return value >= 0; // Check if adult is non-negative
          },
          message: "Adult must be a non-negative number.",
        },
      },
      Infant: {
        type: Number,
        validate: {
          validator: function (value) {
            return value >= 0; // Check if infant is non-negative
          },
          message: "Infant must be a non-negative number.",
        },
      },
    },
    statusFlight: {
      type: String,
      enum: ["pending", "request", "accept"],
      default: "pending",
      required: true,
    },

    additionalComment: { type: String },
  },

  { timestamps: true }
);

const submissionFlight = model("submissionFlight", SubmissionFlightSchema);

module.exports = submissionFlight;
