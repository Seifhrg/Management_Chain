import React from "react";

import validateLoginForm from "./validateLoginForm";
import { Link } from "react-router-dom";
import useLoginForm from "./useLoginForm";

function LoginForm({ submitForm, registerLink }) {
  const { handleChange, values, handleSubmit, errors } = useLoginForm(
    submitForm,
    validateLoginForm
  );

  return (
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
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="form-inputs">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password (Password needs to be 6 characters or more)"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button className="form-input-btn" type="submit">
          Sign In
        </button>
        <span className="form-input-login">
          You don't have an account? Register{" "}
          <Link to={registerLink}>here</Link>
        </span>
      </form>
    </div>
  );
}

export default LoginForm;
