const mongoose = require("mongoose");

const sfcDataSchema = mongoose.Schema({
  sfc: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "sfc",
  },
  nodes: [
    {
      type: { type: String, required: true },
      nodeKey: { type: String, required: true }, // the id same as the label
      data: {
        label: { type: String, required: true },
        extData: {
          expectedProcessingTime: { type: String },
          packetPerSecond: { type: String },
        },
      },
      position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
      },
    },
  ],
  edges: [
    {
      source: { type: String, required: true }, /// same as the label of the node for exemple Host_0
      target: { type: String, required: true },
      linkKey: { type: String, required: true }, /// the id
      extData: {
        debit: { type: Number, required: true },
        propagationDelay: { type: Number, required: true },
      },
    },
  ],
});

module.exports = mongoose.model("sfcData", sfcDataSchema);
