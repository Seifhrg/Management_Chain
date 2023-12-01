import React from "react";

import validateRegisterForm from "./validateRegisterForm";
import { Link } from "react-router-dom";
import useRegisterForm from "./useRegisterForm";

function RegisterForm({ submitForm, loginLink }) {
  const { handleChange, values, handleSubmit, errors } = useRegisterForm(
    submitForm,
    validateRegisterForm
  );

  // const dispatch = useDispatch();
  // useLayoutEffect(() => {
  //   dispatch(reset());
  // });
  return (
    <div className="form-content-right">
      <form className="form" onSubmit={handleSubmit}>
        <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <div className="form-inputs">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-input"
            placeholder="Enter your username"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
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
          <label htmlFor="phoneNumber" className="form-label">
            Phone number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            className="form-input"
            placeholder="+216 xx xxx xxx"
            value={values.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
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
        <div className="form-inputs">
          <label htmlFor="password2" className="form-label">
            Confirm password
          </label>
          <input
            id="password2"
            type="password"
            name="password2"
            className="form-input"
            placeholder="Enter your password again"
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className="form-input-btn" type="submit">
          Sign up
        </button>
        <span className="form-input-login">
          Already have an account? Login <Link to={loginLink}>here</Link>
        </span>
      </form>
    </div>
  );
}

export default RegisterForm;
