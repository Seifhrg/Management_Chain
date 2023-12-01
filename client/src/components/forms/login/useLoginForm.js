import { useState, useEffect } from "react";

const useLoginForm = (callback, validate) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmited, setIsSubmited] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

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

export default useLoginForm;
