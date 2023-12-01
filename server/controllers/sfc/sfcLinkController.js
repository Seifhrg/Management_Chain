const asyncHandler = require("express-async-handler");
const SfcLink = require("../../models/sfc/sfcLink");

//@desc Get sfcLink
//@route  GET /api/customer/sfc/sfcLink/:id     id of sfc
//@access private
const getSfcLink = asyncHandler(async (req, res) => {
  const sfcLink = await SfcLink.find({
    sfc: req.params.id,
  }).populate("sfc");
  res.status(200).json(sfcLink);
});
//@desc Post sfcLink
//@route POST /api/customer/sfc/sfcLink
//@access private
const postSfcLink = asyncHandler(async (req, res) => {
  const {
    linkKey,
    source,
    target,
    extData: { debit, propagationDelay },
  } = req.body.val;
  if (!debit || !propagationDelay || !linkKey || !source || !target) {
    res.status(400);
    throw new Error("missing data");
  }
  const sfcLink = await SfcLink.create({
    linkKey,
    source,
    target,
    extData: { debit, propagationDelay },
    sfc: req.body.val.sfc,
  });

  console.log(req.body.val);
  res.status(200).json({ sfcLink });
});
//@desc update sfcLink
//@route PUT /api/customer/sfc/sfcLink:id
//@access private
const updateSfcLink = asyncHandler(async (req, res) => {
  const sfcLink = await SfcLink.findById(req.params.id);
  if (!sfcLink) {
    res.status(401);
    throw new Error("sfcLink not found !");
  }

  const updateSfcLink = await SfcLink.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json(updateSfcLink);
});
//@desc Delete sfcLink
//@route DELETE /api/customer/sfc/sfcLink:id
//@access private
const deleteSfcLink = asyncHandler(async (req, res) => {
  const sfcLink = await SfcLink.findById(req.params.id);
  if (!sfcLink) {
    res.status(400);
    throw new Error("sfcLink not found !");
  }

  await sfcLink.remove();
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getSfcLink,
  postSfcLink,
  updateSfcLink,
  deleteSfcLink,
};
