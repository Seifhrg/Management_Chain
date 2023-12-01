import React from "react";
import { Link } from "react-router-dom";
import jwt_decoded from "jwt-decode";
import "../../Pages/home/acceuil.css";

function NavBar() {
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };
  const decoded = localStorage.jwt
    ? jwt_decoded(localStorage.getItem("jwt"))
    : "";
  return (
    <nav className="acceuil">
      <div className="acceuil-container">
        <h1 className="acceuil-logo">FLEXNGIA</h1>
      </div>
      <div className="menu-icon"></div>
      <div className="nav-menu active">
        {!localStorage.jwt ? (
          <>
            <div className="nav-item">
              <Link to="/Login" className="nav-links">
                Sign In
              </Link>
            </div>
            <div className="nav-item">
              <Link to="/signup" className="nav-links">
                Sign Up
              </Link>
            </div>
            <div className="nav-item">
              <a href="#footer" className="nav-links">
                Contact Us
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="nav-itemm">
              <Link to="/profile" className="nav-linkss">
                Profil
              </Link>
            </div>
            <button className="buttonn" onClick={handleLogout}>
              <span className="text"> LogOut</span>

              <span className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.84 0l-1.08 1.06 3.3 3.2H0v1.49h17.05l-3.3 3.2L14.84 10 20 5l-5.16-5z" />
                </svg>
              </span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
