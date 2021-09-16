const { Schema, model } = require("mongoose");

const reviewsSchema = new Schema(
  {
    mentee_owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    review: String,
    mentor_reviewed: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Reviews", reviewsSchema);
