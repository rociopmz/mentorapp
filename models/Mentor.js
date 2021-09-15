const { Schema, model } = require("mongoose");

const mentorSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profesion: {
      // Aquí el mentor pone su profesión e industria
      type: String,
      enum: [
        "Diseño de CV",
        "Revisión de Porafolio",
        "Entrevista de Trabajo",
        "Otro",
      ],
      required: [true, "Selecciona una o más opciones"],
    },
    agenda: String, //Calendly
    booked_sessions: String, // historico de sesiones
    reviews: String, // Stars
  },
  { timestamps: true }
);

module.exports = model("Mentor", mentorSchema);
