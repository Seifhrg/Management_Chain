const express = require("express");
const router = express.Router();
const {
  getSfcNode,
  postSfcNode,
  updateSfcNode,
  deleteSfcNode,
} = require("../../controllers/sfc/sfcNodeController");

router.get("/:id", getSfcNode);

router.post("/", postSfcNode);

router.put("/:id", updateSfcNode);
router.delete("/:id", deleteSfcNode);

module.exports = router;
