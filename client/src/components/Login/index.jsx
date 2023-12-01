import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import InputGroup from "../common/inputGroup";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  toast.configure();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/login", form)
      .then((response) => {
        setErrors({});
        window.location.href = "/main";

        localStorage.setItem("jwt", response.data.token);
      })
      .catch((error) => {
        setErrors(error.response.data);
        console.log(error);
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
          <h1>
            Welcome back! Sign in to your account by filling out the information
            below.
          </h1>
          <div className="form-inputs">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <br />
            <InputGroup
              type="text"
              name="email"
              cls="form-input"
              placeholder="email"
              onChange={onChange}
              errors={errors.email}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <br />
            <InputGroup
              type="password"
              name="password"
              cls="form-input"
              placeholder="password"
              onChange={onChange}
              errors={errors.password}
            />
          </div>
          <Link to="/forgot-password" style={{ alignSelf: "flex-start" }}>
            <p className=" forgot" style={{ padding: "0 15px" }}>
              Forgot Password ?
            </p>
          </Link>

          <button className="form-input-btn" type="submit">
            Sign In
          </button>
          <span className="form-input-login">
            You don't have an account ? Sing up <Link to="/Signup">here</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
