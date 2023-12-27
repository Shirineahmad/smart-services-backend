const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const servicesSchema = new Schema(
  {
    packageID: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    country: { type: String, required: true },
    description: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    images: {
      type: [{ type: String }],
      validate: [
        {
          validator: function (v) {
            return v.length >= 3 && v.length <= 6;
          },
        },
      ],
    },
    // status: {
    //   type: String,
    //   enum: ["upload", ""],
    //   required: true,
    // },

    discountID: {
      type: Schema.Types.ObjectId,
      ref: "discount",
      required: true,
    },
  },
  { timestamps: true }
);

const services = model("services", servicesSchema);

module.exports = services;
