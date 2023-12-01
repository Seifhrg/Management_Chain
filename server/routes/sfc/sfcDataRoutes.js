const express = require("express");
const router = express.Router();
const {
  getSfcData,
  postSfcData,
  updateSfcData,
} = require("../../controllers/sfc/sfcDataController");

router.get("/:id", getSfcData);

router.post("/", postSfcData);

router.put("/:id", updateSfcData);

module.exports = router;
