import React from "react";
import NavBar from "../../components/common/NavBar";

import { Button } from "./Button";
import "./acceuil.css";
import { Link } from "react-router-dom";

const Acceuil = () => {
  return (
    <>
      <nav className="acceuil">
        <div className="acceuil-container">
          <div className="menu-icon">
            <Link to="/" className="acceuil-logo">
              FLEXINGA
            </Link>
          </div>
          <NavBar />
        </div>
      </nav>
      <div id="aa" className="hero-container">
        <video src="/videos/video-2.mp4" autoPlay loop muted />
        <h1>A NETWORK FUNCTION CHAIN MANAGMENT PLATFORM</h1>

        <div className="block">
          <p>
            Design novel service chains or mesh customized to your applications
            with specific performance requirements
            (e.g.,latency,availability,packet loss,){" "}
          </p>
          <p>
            and empowered with advanced network functions operating at any layer
            of the protocol stack.{" "}
          </p>
        </div>
        <div className="hero-btns">
          <Button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            What are you waiting for?
          </Button>
        </div>
      </div>
      <div id="footer" className="footer-container">
        <span className="encadrer-un-contenu">
          <p className="contact">E-mail: flexngia@gmail.com </p>
          Phone number: +1 (514) 174-6739
        </span>
        <small id="bb" className="website-rights">
          application © 2022
        </small>
      </div>
    </>
  );
};

export default Acceuil;
