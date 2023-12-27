const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bannerSchema = new Schema(
  {
    title: { type: String, required: true },
    link: {
      type: Array,
      required: true,
      validate: {
        validator: function (value) {
          const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
          return urlRegex.test(value);
        },
        message: "Provide a valid URL in the link input",
      },
    },
  },
  { timestamps: true }
);

const bannerHelp = model("bannerHelp", bannerHelpSchema);

module.exports = bannerHelp;
