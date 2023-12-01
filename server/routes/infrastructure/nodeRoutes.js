const express = require("express");
const router = express.Router();
const {
  getNode,
  postNode,
  updateNode,
  deleteNode,
} = require("../../controllers/infrastructure/nodeController");

router.get("/:id", getNode);

router.post("/", postNode);

router.put("/:id", updateNode);
router.delete("/:id", deleteNode);

module.exports = router;
