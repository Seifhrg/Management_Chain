import React from "react";

import "./headerDashboard.css";

function HeaderDashboard({ onClick }) {
  return (
    <header className="header">
      <button onClick={onClick} className="button">
        <span>
          <b>Log Out</b>
        </span>
      </button>
    </header>
  );
}

export default HeaderDashboard;
