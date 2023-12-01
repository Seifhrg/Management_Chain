const asyncHandler = require("express-async-handler");
const Infrastructure = require("../models/infrastructure/infrastructure");
const User = require("../models/user");

//@desc Get Infrastructure
//@route GET /api/operator/infrastructure
//@access private
const getInfrastructure = asyncHandler(async (req, res) => {
  const infrastructure = await Infrastructure.find({
    operator: req.user.id,
  });
  res.status(200).json(infrastructure);
});
//@desc Post Infrastructure
//@route POST /api/operator/infrastructure
//@access private
const postInfrastructure = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("please add a name");
  }
  const infrastructure = await Infrastructure.create({
    name: req.body.name,
    operator: req.user.id,
  });
  res.status(200).json(infrastructure);
});
//@desc PUT Infrastructure
//@route PUT /api/operator/infrastructure
//@access private

const updateInfrastructure = asyncHandler(async (req, res) => {
  const infrastructure = await Infrastructure.findById(req.params.id);
  if (!infrastructure) {
    res.status(401);
    throw new Error("infrastructure not found !");
  }
  const updateInfrastructure = await Infrastructure.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updateInfrastructure);
});

//@desc Delete Infrastructure
//@route DELETE /api/operator/infrastructure/:id
//@access private
const deleteInfrastructure = asyncHandler(async (req, res) => {
  const infrastructure = await Infrastructure.findById(req.params.id);
  if (!infrastructure) {
    res.status(400);
    throw new Error("infrastructure not found !");
  }

  //check for operator
  if (!req.user) {
    res.status(401);
    throw new Error("operator not found");
  }
  //make sure the login operator matches the infrastructure operator
  if (infrastructure.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("operator not authorized");
  }
  await infrastructure.remove();
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getInfrastructure,
  postInfrastructure,
  deleteInfrastructure,
  updateInfrastructure,
};
