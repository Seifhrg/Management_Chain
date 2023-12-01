const mongoose = require("mongoose");

const infrastructureSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("infrastructure", infrastructureSchema);

//terminé
