import React, { useRef, useState, useEffect } from "react";

import FinalDndPage from "../../components/Dashboard/dnd/customer/FinalDndPage";

import NavBar from "../../components/common/NavBar";

function CustomerDashboard() {
  //

  //

  //for the forms

  //

  const sfc = useRef(null);

  //

  const onSaveSfc = (data) => {
    sfc.current = data;

    console.log(sfc.current);
  };

  //////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////

  return (
    <div>
      <NavBar />

      <FinalDndPage onSaveSfc={onSaveSfc} />
    </div>
  );
}

export default CustomerDashboard;
