const { Schema, model } = require("mongoose");

const menteeSchema = new Schema({
  objective: {
    type: String,
    enum: [
      "Revisión de CV",
      "Revisión de Porafolio",
      "Entrevista de Trabajo",
      "Otro",
    ],
    required: [true, "Selecciona al menos una opción"],
    boooking: String,
    chat: String,
}, { timestamps: true });

module.exports = model("Mentee", mentorSchema);
