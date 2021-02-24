const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mentorSchema = new Schema({

});



const Mentor = mongoose.model("Mentor", mentorSchema);
module.exports = Mentor;