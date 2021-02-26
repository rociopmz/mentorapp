const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Anota tu nombre y apellido"],
    },
    email: {
      type: String,
      required: [true, "Debes agregar un email"],
    },
    password: {
      type: String,
      required: [true, "Agrega un password"],
    },
    profile_picture: {
      type: String,
      default: " ", //Profile pic en cloudinary
    },
    role: {
      type: String,
      enum: ["admin", "user", "mentor", "mentee"],
      default: "user",
    },
    aboutme: String,
    location: String,
    validated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
