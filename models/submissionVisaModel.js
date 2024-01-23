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

    documents: [
      {
        name: { type: String },
        file: { type: String },
      },
    ],

    //  documents: { type: Array, required: true },
    statusVisa: {
      type: String,
      required: true,
      enum: ["pending", "accepted", "rejected"], //has more 7
      default: "pending",
    },
  },

  { timestamps: true }
);

const submissionVisa = model("submissionVisa", SubmissionVisaSchema);

module.exports = submissionVisa;
