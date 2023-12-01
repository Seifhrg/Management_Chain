import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./formD.css";
function PortsForm(props) {
  const Source = props.source;
  const Target = props.target;
  const linkKey = props.linkKey;
  const portsSource = props.portsSource;
  console.log(portsSource);
  const portsTarget = props.portsTarget;
  const initialValues = {
    sourcePort: "",
    targetPort: "",
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
      props.onChange({ formValues, Source, Target, linkKey });
      props.onConfirm();
    }
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const sourcePort = props.sourcePortt;
  const targetPort = props.targetPortt;
  console.log("src and tar");
  console.log(sourcePort, props.sourcePortt, targetPort, props.targetPortt);

  const value = { sourcePort, targetPort };

  useEffect(() => {
    props.sourcePortt && props.targetPortt && setFormValues(value);
  }, []);
  const validate = (values) => {
    const errors = {};
    var srcPortExistance = false;
    for (let index = 0; index < portsSource.length; index++) {
      if (
        portsSource[index].num === values.sourcePort &&
        linkKey != portsSource[index].linkKey
      ) {
        srcPortExistance = true;
      }
    }
    var trgPortExistance = false;
    for (let index = 0; index < portsTarget.length; index++) {
      if (
        portsTarget[index].num === values.targetPort &&
        linkKey != portsTarget[index].linkKey
      ) {
        trgPortExistance = true;
      }
    }

    if (!values.sourcePort) {
      errors.sourcePort = "required field!";
    } else if (
      !/^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(
        values.sourcePort
      )
    ) {
      errors.sourcePort = "Please enter a valid port between 1 and 65535!";
    } else if (srcPortExistance) {
      errors.sourcePort = "Port Used ";
      srcPortExistance = false;
    }
    if (!values.targetPort) {
      errors.targetPort = "required field!";
    } else if (
      !/^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(
        values.targetPort
      )
    ) {
      errors.targetPort = "Please enter a valid port between 1 and 65535!";
    } else if (trgPortExistance) {
      errors.targetPort = "Port Used ";
      trgPortExistance = false;
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
            <h2>Ports Link </h2>
          </div>
          <Divider />
          <form onSubmit={handleSubmit}>
            <h4 className="labell">
              {" "}
              Port used on<b style={{ color: "black" }}> {Source}</b>
            </h4>
            <input
              className="form-fielddd "
              id="sourcePort"
              type="number"
              name="sourcePort"
              value={formValues.sourcePort}
              placeholder=""
              onChange={handleChange}
            />
            <h5 className="errorr">{formErrors.sourcePort}</h5>
            <h4 className="labell">
              {" "}
              Port used on<b style={{ color: "black" }}> {Target}</b>
            </h4>
            <input
              className="form-fielddd "
              id="targetPort"
              type="text"
              name="targetPort"
              value={formValues.targetPort}
              placeholder=""
              onChange={handleChange}
            />
            <h5 className="errorr">{formErrors.targetPort}</h5>

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

export default PortsForm;
