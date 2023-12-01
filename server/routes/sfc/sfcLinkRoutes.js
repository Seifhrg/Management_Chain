const express = require("express");
const router = express.Router();
const {
  getSfcLink,
  postSfcLink,
  updateSfcLink,
  deleteSfcLink,
} = require("../../controllers/sfc/sfcLinkController");

router.get("/:id", getSfcLink);

router.post("/", postSfcLink);

router.put("/:id", updateSfcLink);
router.delete("/:id", deleteSfcLink);

module.exports = router;
