const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const countrySchema = new Schema(
  {
    name: { type: String, required: true },
    countryDescription: { type: String, required: true },
  },
  { timestamps: true }
);

const country = model("country", countrySchema);

module.exports = country;
