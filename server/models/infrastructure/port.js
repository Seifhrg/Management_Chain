const mongoose = require("mongoose");

const portSchema = mongoose.Schema(
  {
    num: { type: Number, required: true },
    linkKey: { type: String, required: true }, /// referrence du id du link liaison avec id link
    node: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "node",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("port", portSchema);
