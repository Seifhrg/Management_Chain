import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./form.css";
function NodeSfcForm(props) {
  const initialValues = {
    id: props.id,
    expectedProcessingTime: "",
    packetPerSecond: "",
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
    console.warn("extData", props.nodeSelectedData.extData);
    props.nodeSelectedData.extData &&
      setFormValues(props.nodeSelectedData.extData);
  }, []);
  const validate = (values) => {
    const errors = {};

    if (!values.expectedProcessingTime) {
      errors.expectedProcessingTime = "required field!";
    } else if (
      !(
        values.expectedProcessingTime > 0 &&
        values.expectedProcessingTime %
          parseInt(values.expectedProcessingTime) ===
          0
      )
    ) {
      errors.expectedProcessingTime = "please enter a valid number";
    }
    if (!values.packetPerSecond) {
      errors.packetPerSecond = "required field!";
    } else if (
      !(
        values.packetPerSecond > 0 &&
        values.packetPerSecond % parseInt(values.packetPerSecond) === 0
      )
    ) {
      errors.packetPerSecond = "Please enter a valid number";
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
            <h2>{props.nodeName} </h2>
          </div>
          <Divider />
          <form onSubmit={handleSubmit}>
            <h4 className="label">Expected Processing Time</h4>
            <input
              className="form-field "
              id="expectedProcessingTime"
              type="number"
              name="expectedProcessingTime"
              value={formValues.expectedProcessingTime}
              placeholder="expected Processing Time "
              onChange={handleChange}
            />
            <h5 className="error">{formErrors.expectedProcessingTime}</h5>
            <h4 className="label">Packet Per Second </h4>
            <input
              className="form-field "
              id="packetPerSecond"
              type="text"
              name="packetPerSecond"
              value={formValues.packetPerSecond}
              placeholder="packet Per Second"
              onChange={handleChange}
            />
            <h5 className="error">{formErrors.packetPerSecond}</h5>

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

export default NodeSfcForm;
