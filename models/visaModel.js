const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const visaSchema = new Schema(
  {
   countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
    countryName:{ type: String, required: true },
    documentsTitle: { type: Array, required: true }, // add each document in object same as requirmentValidation
    title: { type: String, required: true, unique: true },
    requirmentValidation: {
      processTime: { type: String },
      toBeAppliedBefore: { type: Number },
      validity: { type: Number },
      photoSize: { type: String },
      visaType: { type: String },
      Entry: {
        type: String,
        enum: ["single Entry", "multy Entry"],
      },
    },
    fees: {
      generalFees: { type: Number },
      adultFees: { type: Number },
      infantFees: { type: Number },
      childFees: { type: Number },
    },
    // howToPay: [
    //   {
    //     number: { type: Number },
    //     option: { type: Number },
    //     person: { type: String },
    //   },
    // ],
  },
  { timestamps: true }
);

const visa = model("visa", visaSchema);

module.exports = visa;
