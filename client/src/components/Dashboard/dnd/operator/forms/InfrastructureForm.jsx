import React, { useState, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import "./formD.css";
function InfrastructureForm(props) {
  const initialValues = {
    name: "",
  };
  const [formValues, setFormValues] = useState(initialValues);

  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.name.length > 0) {
      props.data(formValues.name);

      props.onConfirm();
    }
    setIsSubmit(true);
  };
  useEffect(() => {
    var name = props.nameInf;
    console.warn("inf", props.nameInf);
    props.nameInf && setFormValues({ name });
  }, []);

  return (
    <div className="backdropp">
      <section className="componentt">
        <div className="stylingg">
          <div>
            <button className="exitt" onClick={props.onConfirm}>
              X
            </button>
            <h2>Infrastructure</h2>
          </div>
          <Divider />
          <form onSubmit={handleSubmit}>
            <h4 className="labell">Infrastructure Name</h4>
            <input
              className="form-fielddd "
              id="name"
              type="text"
              name="name"
              value={formValues.name}
              placeholder="name"
              onChange={handleChange}
            />

            <button
              type="submitt"
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

export default InfrastructureForm;
