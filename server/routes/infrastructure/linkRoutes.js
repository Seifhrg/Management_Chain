const express = require("express");
const router = express.Router();
const {
  getLink,
  postLink,
  updateLink,
  deleteLink,
} = require("../../controllers/infrastructure/linkController");

router.get("/:id", getLink);

router.post("/", postLink);

router.put("/:id", updateLink);
router.delete("/:id", deleteLink);

module.exports = router;
