import React, { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import FinalDndPage from "../../components/Dashboard/dnd/operator/FinalDndPage";
import "./operatordashboard.css";

function OperatorDashboard() {
  const infrastructure = useRef(null);
  const navigate = useNavigate();

  //

  //

  //for the forms

  //
  //

  const onSaveInf = (data) => {
    infrastructure.current = data;

    console.log(infrastructure.current);
  };

  //

  //

  return (
    <div>
      <NavBar />

      <FinalDndPage onSaveInf={onSaveInf} />
    </div>
  );
}

export default OperatorDashboard;
