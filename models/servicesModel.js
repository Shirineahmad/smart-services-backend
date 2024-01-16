const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const servicesSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: Array, required: true },
    images: {
      type: [{ type: String }],
      validate: [
        {
          validator: function (v) {
            return v.length >= 1 && v.length <= 3;
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const service = model("service", servicesSchema);

module.exports = service;
