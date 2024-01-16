const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const howToPaySchema = new Schema(
    {
        number: { type: Number },
        option: { type: String },
        person: { type: String },
        images: { type: String },
    })
    const howToPay = model("howToPay", howToPaySchema);

    module.exports = howToPay;