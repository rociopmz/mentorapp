const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({});

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Mentor;
