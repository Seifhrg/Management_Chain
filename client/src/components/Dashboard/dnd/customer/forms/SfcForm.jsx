import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./sfcForm.css";
function SfcForm(props) {
  const initialValues = {
    nbSources: "",
    nbDestinations: "",
    debit: "",
    delay: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  //

  //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      props.data({ formValues });
      console.log({ formValues });
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
    console.warn("sfc", props.sfcFormData);
    props.sfcFormData && setFormValues(props.sfcFormData);
  }, []);
  const validate = (values) => {
    const errors = {};
    if (!values.nbSources) {
      errors.nbSources = "required field!";
    } else if (
      !(
        values.nbSources > 0 &&
        values.nbSources % parseInt(values.nbSources) === 0
      )
    ) {
      errors.nbSources = "please enter a valid number";
    }

    if (!values.nbDestinations) {
      errors.nbDestinations = "required field!";
    } else if (
      !(
        values.nbDestinations > 0 &&
        values.nbDestinations % parseInt(values.nbDestinations) === 0
      )
    ) {
      errors.nbDestinations = "please enter a valid number";
    }
    if (!values.debit) {
      errors.debit = "required field!";
    } else if (!(values.debit > 0)) {
      errors.debit = "please enter a valid number";
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
    <div className="backdrop">
      <section className="component">
        <div className="styling">
          <div>
            <button className="exit" onClick={props.onConfirm}>
              X
            </button>
            <h2>SFC</h2>
          </div>
          <Divider />
          <form onSubmit={handleSubmit}>
            <h4 className="label">Number of Sources</h4>
            <input
              className="form-field "
              id="nbSources"
              type="number"
              name="nbSources"
              value={formValues.nbSources}
              placeholder="Number of Sources"
              onChange={handleChange}
            />
            <h5 className="error">{formErrors.nbSources}</h5>

            <h4 className="label">Number of Destinations </h4>
            <input
              className="form-field "
              id="nbDestinations"
              type="number"
              name="nbDestinations"
              value={formValues.nbDestinations}
              placeholder="Number of Destinations "
              onChange={handleChange}
            />
            <h5 className="error">{formErrors.nbDestinations}</h5>
            <h4 className="label">Debit Mb/s</h4>
            <input
              className="form-field "
              id="debit"
              type="number"
              name="debit"
              value={formValues.debit}
              placeholder="Debit "
              onChange={handleChange}
            />
            <h5 className="error">{formErrors.debit}</h5>
            <h4 className="label">Delay Ms</h4>
            <input
              className="form-field "
              id="delay"
              type="text"
              name="delay"
              value={formValues.delay}
              placeholder="Delay Ms"
              onChange={handleChange}
            />
            <h5 className="error">{formErrors.delay}</h5>

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

export default SfcForm;
