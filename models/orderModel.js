const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    servicesID: {
      type: Schema.Types.ObjectId,
      ref: "typeServices",
      required: true,
    },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const order = model("order", orderSchema);

module.exports = order;
