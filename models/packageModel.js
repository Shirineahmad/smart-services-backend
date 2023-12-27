const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const packageSchema = new Schema(
  {
    discountID: {
      type: Schema.Types.ObjectId,
      ref: "discount",
      required: true,
    },
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
  },

  { timestamps: true }
);

const package = model("package", packageSchema);

module.exports = package;
