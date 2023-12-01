const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateRegister(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm = !isEmpty(data.confirm) ? data.confirm : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Required name";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Required format email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Required email";
  }
  if (validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = "Required phone number";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Required password";
  }
  if (!validator.equals(data.password, data.confirm)) {
    errors.confirm = "Passwords not matches";
  }
  if (validator.isEmpty(data.confirm)) {
    errors.confirm = "Required confirm";
  }
  if (validator.isEmpty(data.role)) {
    errors.role = "Required role";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
