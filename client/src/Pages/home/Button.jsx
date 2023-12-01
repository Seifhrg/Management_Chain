import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline"];
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({ children, type, onClick }) => {
  return (
    <Link to="/" className="btn-mobile">
      <button
        className={"btn ${checkButtonStyle} ${checkButtonSize}"}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
