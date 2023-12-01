const express = require("express");
const router = express.Router();
const {
  getInfrastructureData,
  postInfrastructureData,
  updateInfrastructureData,
} = require("../../controllers/infrastructure/infrastructureDataController");

router.get("/:id", getInfrastructureData);

router.post("/", postInfrastructureData);

router.put("/:id", updateInfrastructureData);

module.exports = router;
