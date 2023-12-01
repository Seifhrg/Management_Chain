const mongoose = require("mongoose");

const sfcSchema = mongoose.Schema(
  {
    nbSources: { type: Number, required: true },
    nbDestinations: { type: Number, required: true },
    debit: { type: Number, required: true },
    delay: { type: Number, required: true },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sfc", sfcSchema);
