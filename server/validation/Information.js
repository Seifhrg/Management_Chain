const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateInformation(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Required name";
  }
  if (validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "Required phone number";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
