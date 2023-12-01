import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./formD.css";
function HostForm(props) {
  console.log(props.nodeSelectedData.extData);
  const initialValues = {
    cpuCapacity: "",
    ramCapacity: "",
    romCapacity: "",
    ipAddress: "",
    macAddress: "",
  };
  console.log(initialValues.id);
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
    if (!values.cpuCapacity) {
      errors.cpuCapacity = "required field!";
    }
    //else if ()
    if (!values.ramCapacity) {
      errors.ramCapacity = "required field!";
    } else if (
      !(
        values.ramCapacity > 0 &&
        values.ramCapacity % parseInt(values.ramCapacity) === 0
      )
    ) {
      errors.ramCapacity = "please enter a valid number";
    }
    if (!values.romCapacity) {
      errors.romCapacity = "required field!";
    } else if (
      !(
        values.romCapacity > 0 &&
        values.romCapacity % parseInt(values.romCapacity) === 0
      )
    ) {
      errors.romCapacity = "please enter a valid number";
    }
    if (!values.ipAddress) {
      errors.ipAddress = "required field!";
    } else if (
      !/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        values.ipAddress
      )
    ) {
      errors.ipAddress = "Please enter a valid ip address";
    }
    if (!values.macAddress) {
      errors.macAddress = "required field!";
    } else if (
      !/^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/.test(values.macAddress)
    ) {
      errors.macAddress = "Please enter a valid mac address";
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
            <h2>
              {/* we will pass the name of the host here aka id */}
              {props.nodeName}
            </h2>
          </div>
          <Divider />
          <form onSubmit={handleSubmit}>
            <h4 className="labell">CPU Capacity</h4>
            <input
              className="form-fieldd "
              id="cpuCapacity"
              type="number"
              name="cpuCapacity"
              value={formValues.cpuCapacity}
              placeholder="CPU Capacity"
              onChange={handleChange}
            />
            <h5 className="errorr">{formErrors.cpuCapacity}</h5>

            <h4 className="labell">Memory Capacity GB </h4>
            <input
              className="form-fieldd "
              id="ramCapacity"
              type="number"
              name="ramCapacity"
              value={formValues.ramCapacity}
              placeholder="Memory Capacity "
              onChange={handleChange}
            />
            <h5 className="errorr">{formErrors.ramCapacity}</h5>
            <h4 className="labell">Disk Capacity GB</h4>
            <input
              className="form-fieldd "
              id="romCapacity"
              type="number"
              name="romCapacity"
              value={formValues.romCapacity}
              placeholder="Disk Capacity "
              onChange={handleChange}
            />
            <h5 className="errorr">{formErrors.romCapacity}</h5>
            <h4 className="labell">IP Address</h4>
            <input
              className="form-fieldd "
              id="ipAddress"
              type="text"
              name="ipAddress"
              value={formValues.ipAddress}
              placeholder="Exp: 168.212.226.204"
              onChange={handleChange}
            />
            <h5 className="errorr">{formErrors.ipAddress}</h5>
            <h4 className="labell">MAC Address</h4>
            <input
              className="form-fieldd "
              id="macAddress"
              type="text"
              name="macAddress"
              value={formValues.macAddress}
              placeholder="Exp: 01:23:45:67:89:AB"
              onChange={handleChange}
            />
            <h5 className="errorr">{formErrors.macAddress}</h5>

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

export default HostForm;
