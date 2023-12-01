const isEmpty = require("./isEmpty");
const validator = require("validator");

module.exports = function ValidateReset(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm = !isEmpty(data.confirm) ? data.confirm : "";
  data.last = !isEmpty(data.last) ? data.last : "";

  if (validator.isEmpty(data.last)) {
    errors.last = "Required last password";
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

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
