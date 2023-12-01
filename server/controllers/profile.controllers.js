const User = require("../models/user");
const ValidateInformation = require("../validation/Information");
const ValidateReset = require("../validation/ValidateReset");

const bcrypt = require("bcryptjs");
const FindOne = async (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const Information = (req, res) => {
  const { errors, isValid } = ValidateInformation(req.body);
  try {
    if (!isValid) {
      retun(res.status(404).json(errors));
    } else {
      User.updateOne(
        { _id: req.user._id },
        { $set: req.body },
        { new: true }
      ).then(async () => {
        User.findOne({ _id: req.user._id }).then((data) => {
          res.status(200).json(data);
        });
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const ResetPassword = (req, res) => {
  const { errors, isValid } = ValidateReset(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      User.findOne({ _id: req.user._id }).then((user) => {
        bcrypt.compare(req.body.last, user.password).then((isMatch) => {
          if (!isMatch) {
            errors.last = "incorrect password";
            res.status(404).json(errors);
          } else {
            const hash = bcrypt.hashSync(req.body.password, 10); //hashed password
            user.password = hash;
            user.save();
            res.status(200).json({ success: true });
          }
        });
      });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};
module.exports = {
  FindOne,
  Information,
  ResetPassword,
};
