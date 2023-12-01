import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import InputGroup from "../common/inputGroup";
import Swal from "sweetalert2";
import "./signup.css";

const Signup = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/register", form)
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 2500,
        });
        setErrors({});
        navigate("/login");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };
  return (
    <div className="form-container">
      <a
        onClick={() => {
          navigate("/");
        }}
        className="close-btn"
      >
        x
      </a>
      <div className="form-content-left">
        <img
          src="/images/login-form.png"
          alt="spaceship"
          className="form-img"
        />
      </div>

      <div className="form-content-right">
        <form className="form" onSubmit={handleSubmit}>
          {" "}
          <h1>
            Get started with us today! Create your account by filling out the
            information below.
          </h1>
          <div className="form-inputs">
            <InputGroup
              id="name"
              type="text"
              name="name"
              cls="form-input"
              placeholder="Enter your username"
              onChange={onChange}
            />
          </div>
          <div className="form-inputs">
            <InputGroup
              type="text"
              name="email"
              cls="form-input"
              placeholder="Enter your email"
              onChange={onChange}
              errors={errors.email}
            />
          </div>
          <div className="form-inputs">
            <InputGroup
              type="text"
              name="phoneNumber"
              cls="form-input"
              placeholder="Enter your phone Number"
              onChange={onChange}
              errors={errors.phoneNumber}
            />
          </div>
          <div className="form-inputs">
            <InputGroup
              type="password"
              name="password"
              cls="form-input"
              placeholder="Enter your password"
              onChange={onChange}
              errors={errors.password}
            />
          </div>
          <div className="form-inputs">
            <InputGroup
              type="password"
              name="confirm"
              cls="form-input"
              placeholder="Enter your confirm password"
              onChange={onChange}
              errors={errors.confirm}
            />
          </div>
          <div>
            <div className="select">
              <select name="role" onChange={onChange}>
                <option selected>Select your role</option>
                <option value="Customer"> Customer</option>
                <option value="Operator"> Operator</option>
              </select>
            </div>
            {errors.role && <div style={{ color: "red" }}>{errors.role}</div>}
          </div>
          <button type="submit" className="form-input-btn">
            Sign up
          </button>
          <span className="form-input-login">
            Already have an account? Login <Link to="/login">here</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
