import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./form.css";
function SfcLinkForm(props) {
  const initialValues = {
    debit: "",
    propagationDelay: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      props.onChange({ formValues });
      props.onConfirm();
    }
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  useEffect(() => {
    console.warn("extData", props.EdgeSelectedData.extData);
    props.EdgeSelectedData.extData &&
      setFormValues(props.EdgeSelectedData.extData);
  }, []);
  const validate = (values) => {
    const errors = {};

    if (!values.debit) {
      errors.debit = "required field!";
    } else if (
      !(values.debit > 0 && values.debit % parseInt(values.debit) === 0)
    ) {
      errors.debit = "please enter a valid number";
    }
    if (!values.propagationDelay) {
      errors.propagationDelay = "required field!";
    } else if (
      !(
        values.propagationDelay > 0 &&
        values.propagationDelay % parseInt(values.propagationDelay) === 0
      )
    ) {
      errors.propagationDelay = "Please enter a valid number";
    }

    return errors;
  };
  return (
    <div className="backdrop">
      <section className="component">
        <div className="styling">
          <div>
            <button className="exit" onClick={props.onConfirm}>
              X
            </button>
            <h2>Sfc Link </h2>
          </div>
          <Divider />
          <form onSubmit={handleSubmit}>
            <h4 className="label">debit Mb/s</h4>
            <input
              className="form-field "
              id="debit"
              type="number"
              name="debit"
              value={formValues.debit}
              placeholder="debit"
              onChange={handleChange}
            />
            <h5 className="error">{formErrors.debit}</h5>
            <h4 className="label">propagationDelay ms </h4>
            <input
              className="form-field "
              id="propagationDelay"
              type="text"
              name="propagationDelay"
              value={formValues.propagationDelay}
              placeholder="propagationDelay"
              onChange={handleChange}
            />
            <h5 className="error">{formErrors.propagationDelay}</h5>

            <button
              type="submit"
              className="valid-button"
              onClick={handleSubmit}
            >
              Validate
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default SfcLinkForm;
