import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./formD.css";
function LinkForm(props) {
  const initialValues = {
    bandwith: "",
    delay: "",
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

    if (!values.bandwith) {
      errors.bandwith = "required field!";
    } else if (
      !(
        values.bandwith > 0 && values.bandwith % parseInt(values.bandwith) === 0
      )
    ) {
      errors.bandwith = "please enter a valid number";
    }
    if (!values.delay) {
      errors.delay = "required field!";
    } else if (
      !(values.delay > 0 && values.delay % parseInt(values.delay) === 0)
    ) {
      errors.delay = "Please enter a valid number";
    }

    return errors;
  };
  return (
    <div className="backdropp">
      <section className="componentt">
        <div className="stylingg">
          <div>
            <button className="exitt" onClick={props.onConfirm}>
              X
            </button>
            <h2>Link </h2>
          </div>
          <Divider />
          <form onSubmit={handleSubmit}>
            <h4 className="labell">Bandwith Mb/s</h4>
            <input
              className="form-fielddd "
              id="bandwith"
              type="number"
              name="bandwith"
              value={formValues.bandwith}
              placeholder="Bandwith"
              onChange={handleChange}
            />
            <h5 className="errorr">{formErrors.bandwith}</h5>
            <h4 className="labell">Delay ms </h4>
            <input
              className="form-fielddd "
              id="delay"
              type="text"
              name="delay"
              value={formValues.delay}
              placeholder="Delay"
              onChange={handleChange}
            />
            <h5 className="errorr">{formErrors.delay}</h5>

            <button
              type="submit"
              className="valid-buttonn"
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

export default LinkForm;
