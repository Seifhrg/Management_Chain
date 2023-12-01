import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import InputGroup from "../common/inputGroup";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import "../../Pages/home/acceuil.css";
import NavBarP from "../common/NavbarP";

const Profil = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [passwords, setPasswords] = useState({});
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onChangePasswords = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .get("/api/profile")
      .then((response) => {
        setForm(response.data);
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("/api/profile", form)
      .then((response) => {
        setForm(response.data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your update has been saved",
          showConfirmButton: false,
          timer: 2500,
        });
        setErrors({});
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    axios
      .put("/api/update", passwords)
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your update has been saved",
          showConfirmButton: false,
          timer: 2500,
        });
        setErrors({});
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  return (
    <div>
      <nav className="acceuil">
        <div className="acceuil-container">
          <NavBarP />
        </div>
      </nav>

      <div className="form-container">
        <div className="form-content-left">
          <form className={styles.form_container} onSubmit={handleSubmit}>
            {" "}
            <h1>Edit information about your account</h1>
            <label htmlFor="email" className={styles.form_label}>
              Name
            </label>
            <InputGroup
              type="text"
              name="name"
              cls={styles.input}
              placeholder="name"
              onChange={onChange}
              errors={errors.name}
              value={form.name}
            />
            <label htmlFor="email" className={styles.form_label}>
              Email
            </label>
            <InputGroup
              type="text"
              name="email"
              cls={styles.input}
              placeholder="email"
              onChange={onChange}
              errors={errors.email}
              value={form.email}
              disable="true"
            />
            <label htmlFor="email" className={styles.form_label}>
              Phone number
            </label>
            <InputGroup
              type="text"
              name="phoneNumber"
              cls={styles.input}
              placeholder="Your phone Number"
              onChange={onChange}
              errors={errors.phoneNumber}
              value={form.phoneNumber}
            />
            <button type="submit" className={styles.green_btn}>
              Save
            </button>
          </form>
        </div>

        <div className="form-content-right">
          <form
            className={styles.form_container}
            onSubmit={handleSubmitPassword}
          >
            {" "}
            <h1>Edit your password</h1>
            <label htmlFor="password" className={styles.form_label}>
              Last password
            </label>
            <InputGroup
              type="password"
              name="last"
              cls={styles.input}
              placeholder="Your last password"
              onChange={onChangePasswords}
              errors={errors.last}
            />
            <label htmlFor="password" className={styles.form_label}>
              New password
            </label>
            <InputGroup
              type="password"
              name="password"
              cls={styles.input}
              placeholder="New password"
              onChange={onChangePasswords}
              errors={errors.password}
            />
            <label htmlFor="password" className={styles.form_label}>
              Confirm your password
            </label>
            <InputGroup
              type="password"
              name="confirm"
              cls={styles.input}
              placeholder="Confirm the new password"
              onChange={onChangePasswords}
              errors={errors.confirm}
            />
            <button type="submit" className={styles.green_btn}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profil;
