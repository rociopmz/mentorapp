const { Schema, model } = require("mongoose");

const ratingSchema = new Schema({}, { timestamps: true });

module.exports = model("Reviews", ratingSchema);
