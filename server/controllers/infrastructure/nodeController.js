const asyncHandler = require("express-async-handler");
const Node = require("../../models/infrastructure/node");

//@desc Get node
//@route  GET /api/operator/infrastructure/node/:id    id of the infra
//@access private
const getNode = asyncHandler(async (req, res) => {
  const node = await Node.find({
    infrastructure: req.params.id,
  }).populate("infrastructure");
  res.status(200).json(node);
});
//@desc Post node
//@route POST /api/operator/infrastructure/node
//@access private
const postNode = asyncHandler(async (req, res) => {
  const {
    type,
    data: {
      label,
      extData: {
        cpuCapacity,
        ramCapacity,
        romCapacity,
        ipAddress,
        macAddress,
        portTcp,
      },
    },
    nodeKey,
    position: { x, y },
  } = req.body.vall;
  if (
    !type ||
    !cpuCapacity ||
    !ramCapacity ||
    !romCapacity ||
    !ipAddress ||
    !macAddress ||
    !label ||
    !nodeKey ||
    !x ||
    !y
  ) {
    res.status(400);
    throw new Error("missing data");
  }
  const node = await Node.create({
    type,
    data: {
      label,
      extData: {
        cpuCapacity,
        ramCapacity,
        romCapacity,
        ipAddress,
        macAddress,
        portTcp,
      },
    },

    nodeKey,
    position: { x, y },

    infrastructure: req.body.vall.infrastructure,
  });
  res.status(200).json(node);
});
//@desc update node
//@route PUT api/operator/infrastructure/node/:id
//@access private
const updateNode = asyncHandler(async (req, res) => {
  const node = await Node.findById(req.params.id);
  if (!node) {
    res.status(401);
    throw new Error("node not found !");
  }

  const updateNode = await Node.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(updateNode);
});
//@desc Delete node
//@route DELETE /api/operator/infrastructure/node/:id
//@access private
const deleteNode = asyncHandler(async (req, res) => {
  const node = await Node.findById(req.params.id);
  if (!node) {
    res.status(400);
    throw new Error("node not found !");
  }

  await node.remove();
  res.status(200).json({ id: req.params.id });
});
module.exports = { getNode, postNode, updateNode, deleteNode };
