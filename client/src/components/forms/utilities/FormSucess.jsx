import React from "react";

function FormSucess({ message }) {
  return (
    <>
      <div className="form-content-right">
        <div className="form-success"> {message}</div>
        <img
          src="/images/success.svg"
          alt="success-image"
          className="form-img-2"
        />
      </div>
    </>
  );
}

export default FormSucess;
