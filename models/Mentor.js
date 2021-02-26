const { Schema, model } = require("mongoose");

const mentorSchema = new Schema(
  {
    profesion: {
      // Aquí el mentos pone su profesión e industria
      type: String,
      enum: [
        "Diseño de CV",
        "Revisión de Porafolio",
        "Entrevista de Trabajo",
        "Otro",
      ],
      required: [true, "Selecciona una o más opciones"],
    },
    avalability: String, //agenda
    bookings: String, // sesiones programadas
    messages: String, // comunicación con el mentee
    reviews: String, // Stars más texto
    blog: String, // Esto debe ser media: texto, imagen. video, links.
  },
  { timestamps: true }
);

module.exports = model("Mentor", mentorSchema);
