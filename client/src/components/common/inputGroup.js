import React from "react";

function InputGroup({
  type,
  name,
  cls,
  placeholder,
  onChange,
  errors,
  value,
  disable,
}) {
  return (
    <React.Fragment>
      <input
        type={type}
        name={name}
        className={cls}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disable}
      />
      {errors && <div style={{ color: "red" }}>{errors}</div>}
    </React.Fragment>
  );
}

export default InputGroup;
