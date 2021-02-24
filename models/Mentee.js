const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menteeSchema = new Schema({

});



const Mentee = mongoose.model("Mentee", mentorSchema);
module.exports = Mentee;