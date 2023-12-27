const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const requirmentSchema = new Schema(
  {
    fullAddress: { type: String },
    nationality: { type: Array },
    urgentNumber: { type: Number },
    files: { type: Object },
    countryID: {
      type: Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    typeServicesID: {
      type: Schema.Types.ObjectId,
      ref: "typeServices",
      required: true,
    },
  },
  { timestamps: true }
);

const requirement = model("requirment", requirmentSchema);

module.exports = requirement;
