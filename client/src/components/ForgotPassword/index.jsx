import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import InputGroup from "../common/inputGroup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
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
      .post("http://localhost:5000/api/reset", form)
      .then((response) => {
        console.log(response);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New password has been sent to your email",
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
    <div className={styles.container}>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <h1 className={styles.h_container}>Forgot Password</h1>
        <InputGroup
          type="text"
          name="email"
          cls={styles.input}
          placeholder="email"
          onChange={onChange}
          errors={errors.email}
        />
        <button type="submit" className={styles.green_btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
