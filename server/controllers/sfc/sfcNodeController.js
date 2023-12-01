const asyncHandler = require("express-async-handler");
const SfcNode = require("../../models/sfc/sfcNode");

//@desc Get sfcNode
//@route  GET /api/customer/sfc/sfcNode/:id   id of sfc
//@access private
const getSfcNode = asyncHandler(async (req, res) => {
  const sfcNode = await SfcNode.find({ sfc: req.params.id }).populate("sfc");
  res.status(200).json(sfcNode);
});
//@desc Post sfcNode
//@route POST /api/customer/sfc/sfcNode
//@access private
const postSfcNode = asyncHandler(async (req, res) => {
  const {
    type,
    data: {
      label,
      extData: { expectedProcessingTime, packetPerSecond },
    },
    nodeKey,
    position: { x, y },
  } = req.body.vall;
  if (!type || !label || !nodeKey || !x || !y) {
    res.status(400);
    throw new Error("missing data");
  }
  const sfcNode = await SfcNode.create({
    type,
    data: {
      label,
      extData: {
        expectedProcessingTime,
        packetPerSecond,
      },
    },
    nodeKey,
    position: { x, y },

    sfc: req.body.vall.sfc,
  });
  res.status(200).json(sfcNode);
});
//@desc update sfcNode
//@route PUT /api/customer/sfc/sfcNode/:id
//@access private
const updateSfcNode = asyncHandler(async (req, res) => {
  const sfcNode = await SfcNode.findById(req.params.id);
  if (!sfcNode) {
    res.status(401);
    throw new Error("sfcNode not found !");
  }

  const updateSfcNode = await SfcNode.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json(updateSfcNode);
});
//@desc Delete sfcNode
//@route DELETE /api/customer/sfc/sfcNode/:id
//@access private
const deleteSfcNode = asyncHandler(async (req, res) => {
  const sfcNode = await SfcNode.findById(req.params.id);
  if (!sfcNode) {
    res.status(400);
    throw new Error("node not found !");
  }

  await sfcNode.remove();
  res.status(200).json({ id: req.params.id });
});
module.exports = { getSfcNode, postSfcNode, updateSfcNode, deleteSfcNode };
