const asyncHandler = require("express-async-handler");
const InfrastructureData = require("../../models/infrastructure/InfrastructureData");

//@desc Get InfrastructureData
//@route  GET /api/operator/infrastructure/infrastructureData/:id
//@access private
const getInfrastructureData = asyncHandler(async (req, res) => {
  const infrastructureData = await InfrastructureData.find({
    infrastructure: req.params.id,
  }).populate("infrastructure");
  res.status(200).json(infrastructureData);
});
//@desc Post infrastructureData
//@route POST /api/operator/infrastructure/infrastructureData
//@access private
const postInfrastructureData = asyncHandler(async (req, res) => {
  const infrastructureData = await InfrastructureData.create(
    req.body.postedInfrastructure
  );

  console.log(req.body.postedInfrastructure);
  res.status(200).json(infrastructureData);
});
//@desc update InfrastructureData
//@route PUT /api/operator/infrastructure/infrastructureData/:id
//@access private
const updateInfrastructureData = asyncHandler(async (req, res) => {
  const infrastructureData = await InfrastructureData.findById(req.params.id);
  if (!infrastructureData) {
    res.status(401);
    throw new Error("InfrastructureData not found !");
  }

  const updateInfrastructureData = await InfrastructureData.findByIdAndUpdate(
    req.params.id,
    req.body.postedInfrastructure,
    {
      new: true,
    }
  );
  res.status(200).json(updateInfrastructureData);
});
// //@desc Delete InfrastructureData
// //@route DELETE /api/operator/infrastructure/infrastructureData/:id
// //@access private
// const deleteInfrastructureData = asyncHandler(async (req, res) => {
//   const infrastructureData = await InfrastructureData.findById(req.params.id);
//   if (!infrastructureData) {
//     res.status(400);
//     throw new Error("inf data not found !");
//   }

//   await infrastructureData.remove();
//   res.status(200).json({ id: req.params.id });
// });
module.exports = {
  getInfrastructureData,
  postInfrastructureData,
  updateInfrastructureData /* deleteInfrastructureData*/,
};
