const mongoose = require("mongoose");

const infrastructureDataSchema = mongoose.Schema({
  infrastructure: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "infrastructure",
  },
  nodes: [
    {
      type: { type: String, required: true },
      nodeKey: { type: String, required: true },
      data: {
        ports: [
          {
            num: { type: Number },
            linkKey: { type: String },
          },
        ],
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
    },
  ],
  edges: [
    {
      source: { type: String, required: true },
      target: { type: String, required: true },
      extData: {
        bandwith: { type: Number, required: true },
        delay: { type: Number, required: true },
      },
      linkKey: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("infrastructureData", infrastructureDataSchema);
