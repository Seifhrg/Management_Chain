const express = require("express");
const router = express.Router();
const {
  getInfrastructure,
  postInfrastructure,
  deleteInfrastructure,
  updateInfrastructure,
} = require("../controllers/infrastructureController");
const { protect } = require("../middleware/authUserMiddleware");

router.get("/", protect, getInfrastructure);
router.post("/", protect, postInfrastructure);
router.put("/:id", protect, updateInfrastructure);
router.delete("/:id", protect, deleteInfrastructure);

module.exports = router;
