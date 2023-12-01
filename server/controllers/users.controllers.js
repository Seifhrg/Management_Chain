const User = require("../models/user");
const ValidateRegister = require("../validation/Register");
const ValidateLogin = require("../validation/Login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mailer = require("../security/mailer");

const Register = async (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      User.findOne({ email: req.body.email }).then(async (exist) => {
        if (exist) {
          errors.email = "user exist";
          res.status(404).json(errors);
        } else {
          const hash = bcrypt.hashSync(req.body.password, 10); //hashed password
          req.body.password = hash;
          await User.create(req.body);
          res.status(200).json({ message: "success" });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const Login = async (req, res) => {
  const { errors, isValid } = ValidateLogin(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          errors.email = "not found user";
          res.status(404).json(errors);
        } else {
          bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if (!isMatch) {
              errors.password = "incorrect password";
              res.status(404).json(errors);
            } else {
              var token = jwt.sign(
                {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  phoneNumber: user.phoneNumber,
                  role: user.role,
                },
                process.env.JWT_SECRET,
                { expiresIn: "30d" }
              );
              mailer(
                req.body.email,
                "Security alert",
                "Your Flexngia account was signed in ! You're getting this email to make sure that it was you!"
              );
              res.status(200).json({
                message: "success",
                token: "Bearer " + token,
              });
            }
          });
        }
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const Reset = (req, res) => {
  let errors = {};
  var randomstring = Math.random().toString(36).slice(-8);
  try {
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        errors.email = "not found user";
        res.status(404).json(errors);
      } else {
        const hash = bcrypt.hashSync(randomstring, 10); //hashed password
        user.password = hash;
        user.save();
        mailer(req.body.email, "new password", randomstring);
        res.status(200).json({
          message: "success",
        });
      }
    });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  Register,
  Login,
  Reset,
};
