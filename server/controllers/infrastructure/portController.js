const asyncHandler = require("express-async-handler");
const Port = require("../../models/infrastructure/port");

//@desc Get port
//@route  GET /api/operator/infrastructure/nodes/port/:id   id of the node
//@access private
const getPort = asyncHandler(async (req, res) => {
  const port = await Port.find({
    node: req.params.id,
  }).populate("node");
  res.status(200).json(port);
});
//@desc Post port
//@route POST /api/operator/infrastructure/nodes/port
//@access private
const postPort = asyncHandler(async (req, res) => {
  const { linkKey, num } = req.body.portD;
  if (!linkKey || !num) {
    res.status(400);
    throw new Error("missing data");
  }
  const port = await Port.create({
    linkKey,
    num,

    node: req.body.portD.node,
  });
  res.status(200).json(port);
});
//@desc update port
//@route PUT /api/operator/infrastructure/nodes/port/:id
//@access private
const updatePort = asyncHandler(async (req, res) => {
  const port = await Port.findById(req.params.id);
  if (!port) {
    res.status(401);
    throw new Error("port not found !");
  }

  const updatePort = await Port.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(updatePort);
});
//@desc Delete port
//@route DELETE /api/operator/infrastructure/nodes/port/:id
//@access private
const deletePort = asyncHandler(async (req, res) => {
  const port = await Port.findById(req.params.id);
  if (!port) {
    res.status(400);
    throw new Error("port not found !");
  }

  await port.remove();
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getPort,
  postPort,
  updatePort,
  deletePort,
};
