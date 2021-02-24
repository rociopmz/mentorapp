const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    profile_picture: String,
    role: {
      type: String,
      enum: ["admin", "user", "mentor", "mentee"],
      default: "user",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
}  
);

const User = mongoose.model("User", userSchema);
module.exports = User;
