const express = require("express");
const router = express.Router();
const {
  getPort,
  postPort,
  updatePort,
  deletePort,
} = require("../../controllers/infrastructure/portController");

router.get("/:id", getPort);

router.post("/", postPort);

router.put("/:id", updatePort);
router.delete("/:id", deletePort);

module.exports = router;
