const express = require("express");
const router = express.Router();
const {
  getSfc,
  postSfc,
  updateSfc,
  deleteSfc,
} = require("../controllers/sfcController");
const { protect } = require("../middleware/authUserMiddleware");
router.get("/", protect, getSfc);

router.post("/", protect, postSfc);

router.put("/:id", protect, updateSfc);
router.delete("/:id", protect, deleteSfc);

module.exports = router;
