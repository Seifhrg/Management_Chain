import { useState, useEffect } from "react";

const useRegisterForm = (callback, validate) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    password2: "",
  });

  const { name, email, phoneNumber, password, password2 } = values;

  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setErrors(validateRegisterForm(values, isSubmited));
    setValues({
      ...values,
      [name]: value,
    });
  };
  // const isCustomer = useSelector(() => )
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmited(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmited) {
      callback(values);
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default useRegisterForm;
