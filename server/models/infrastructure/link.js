const mongoose = require("mongoose");

const linkSchema = mongoose.Schema(
  {
    source: { type: String, required: true }, /// same as the label of the node for exemple Host_0
    target: { type: String, required: true },
    extData: {
      bandwith: { type: Number, required: true },
      delay: { type: Number, required: true },
    },
    linkKey: { type: String, required: true }, /// the id

    infrastructure: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "infrastructure",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("link", linkSchema);
