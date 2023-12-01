var express = require("express");
const { Register, Login, Reset } = require("../controllers/users.controllers");
var router = express.Router();
const passport = require("passport");
const {
  FindOne,
  Information,
  ResetPassword,
} = require("../controllers/profile.controllers");

/* users routes. */
router.post("/register", Register);
router.post("/login", Login);
router.post("/reset", Reset);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  FindOne
);

router.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  Information
);
router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  ResetPassword
);

module.exports = router;
