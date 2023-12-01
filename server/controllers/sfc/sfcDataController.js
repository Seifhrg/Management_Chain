const asyncHandler = require("express-async-handler");
const SfcData = require("../../models/sfc/SfcData");

//@desc Get sfcData
//@route  GET /api/customer/sfc/sfcData/:id   id of sfc
//@access private
const getSfcData = asyncHandler(async (req, res) => {
  const sfcData = await SfcData.find({ sfc: req.params.id }).populate("sfc");
  res.status(200).json(sfcData);
});
//@desc Post sfcData
//@route POST /api/customer/sfc/sfcData
//@access private
const postSfcData = asyncHandler(async (req, res) => {
  const sfcData = await SfcData.create(req.body.postedSfc);

  console.log(req.body.postedSfc);
  res.status(200).json(sfcData);
});
//@desc update sfcData
//@route PUT /api/customer/sfc/sfcData/:id
//@access private
const updateSfcData = asyncHandler(async (req, res) => {
  const sfcData = await SfcData.findById(req.params.id);
  if (!sfcData) {
    res.status(401);
    throw new Error("SfcData not found !");
  }

  const updateSfcData = await SfcData.findByIdAndUpdate(
    req.params.id,
    req.body.postedSfc,
    {
      new: true,
    }
  );
  res.status(200).json(updateSfcData);
});
// //@desc Delete sfcNode
// //@route DELETE /api/customer/sfc/sfcNode/:id
// //@access private
// const deleteSfcData = asyncHandler(async (req, res) => {
//   const sfcData = await SfcData.findById(req.params.id);
//   if (!sfcData) {
//     res.status(400);
//     throw new Error("node not found !");
//   }

//   await sfcData.remove();
//   res.status(200).json({ id: req.params.id });
// });
module.exports = { getSfcData, postSfcData, updateSfcData /*deleteSfcData*/ };
