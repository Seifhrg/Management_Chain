const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: "string",
      required: true,
      trim: true,
      unique: true,
    },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },

    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
