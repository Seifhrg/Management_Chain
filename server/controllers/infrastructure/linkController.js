const asyncHandler = require("express-async-handler");
const Link = require("../../models/infrastructure/link");

//@desc Get link
//@route  GET /api/operator/infrastructure/nodes/lin:id    id of the infra
//@access private
const getLink = asyncHandler(async (req, res) => {
  const link = await Link.find({
    infrastructure: req.params.id,
  }).populate("infrastructure");
  res.status(200).json(link);
});
//@desc Post link
//@route POST /api/operator/infrastructure/nodes/link
//@access private
const postLink = asyncHandler(async (req, res) => {
  const {
    linkKey,
    source,
    target,
    extData: { bandwith, delay },
  } = req.body.val;
  if (!bandwith || !delay || !linkKey || !source || !target) {
    res.status(400);
    throw new Error("missing data");
  }
  const link = await Link.create({
    extData: { bandwith, delay },
    linkKey,
    source,
    target,

    infrastructure: req.body.val.infrastructure,
  });
  res.status(200).json(link);
});
//@desc update link
//@route PUT /api/operator/infrastructure/nodes/link/:id
//@access private
const updateLink = asyncHandler(async (req, res) => {
  const link = await Link.findById(req.params.id);
  if (!link) {
    res.status(401);
    throw new Error("link not found !");
  }

  const updateLink = await Link.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(updateLink);
});
//@desc Delete link
//@route DELETE /api/operator/infrastructure/nodes/link/:id
//@access private
const deleteLink = asyncHandler(async (req, res) => {
  const link = await Link.findById(req.params.id);
  if (!link) {
    res.status(400);
    throw new Error("link not found !");
  }

  await link.remove();
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getLink,
  postLink,
  updateLink,
  deleteLink,
};
