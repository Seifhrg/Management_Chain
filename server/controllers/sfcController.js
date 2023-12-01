const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Sfc = require("../models/sfc/sfc");
//@desc Get sfc
//@route  GET /api/customer/sfc
//@access private
const getSfc = asyncHandler(async (req, res) => {
  const sfc = await Sfc.find({ customer: req.user.id });
  res.status(200).json(sfc);
});
//@desc Post sfc
//@route POST /api/customer/sfc
//@access private
const postSfc = asyncHandler(async (req, res) => {
  const { nbSources, nbDestinations, debit, delay } = req.body;
  if (!nbSources || !nbDestinations || !debit || !delay) {
    res.status(400);
    throw new Error("missing data");
  }
  const sfc = await Sfc.create({
    nbSources,
    nbDestinations,
    debit,
    delay,
    customer: req.user.id,
  });
  res.status(200).json(sfc);
});
//@desc update sfc
//@route PUT /api/customer/sfc/:id
//@access private
const updateSfc = asyncHandler(async (req, res) => {
  const sfc = await Sfc.findById(req.params.id);
  if (!sfc) {
    res.status(401);
    throw new Error("sfc not found !");
  }
  const updateSfc = await Sfc.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateSfc);
});
//@desc Delete sfc
//@route DELETE /api/customer/sfc/:id
//@access private
const deleteSfc = asyncHandler(async (req, res) => {
  const sfc = await Sfc.findById(req.params.id);
  if (!sfc) {
    res.status(400);
    throw new Error("sfc not found !");
  }

  //check for customer
  if (!req.user) {
    res.status(401);
    throw new Error("customer not found");
  }
  //make sure the login customer matches the sfc customer
  if (sfc.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("customer not authorized");
  }
  await sfc.remove();
  res.status(200).json({ id: req.params.id });
});
module.exports = { getSfc, postSfc, updateSfc, deleteSfc };
