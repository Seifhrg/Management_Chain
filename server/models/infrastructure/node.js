///////////
const mongoose = require("mongoose");

const nodeSchema = mongoose.Schema(
  {
    type: { type: String, required: true },
    nodeKey: { type: String, required: true }, // the id same as the label
    data: {
      label: { type: String, required: true },
      extData: {
        cpuCapacity: { type: Number, required: true },
        ramCapacity: { type: Number, required: true },
        romCapacity: { type: Number, required: true },
        ipAddress: { type: String, required: true },
        macAddress: { type: String, required: true },
        portTcp: { type: String },
      },
    },

    position: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },

    infrastructure: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "infrastructure",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("node", nodeSchema);
