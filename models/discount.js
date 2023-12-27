const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const discountSchema = new Schema(
  {
    title: { type: String, required: true },
    link: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
          return urlRegex.test(value);
        },
        message: "Provide a valid URL in the link input",
      },
    },
    discountPercentage: { type: Number },
    image: { type: String, required: true },
    higlighted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const discount = model("discount", discountSchema);

module.exports = discount;
