import React, { useState } from "react";

import "./dragDropOperator.css";
//the logic for draggable components pictures
const componentsPicturesList = [
  {
    name: "Host",
    id: 1,
    url: "/pictures/host.png",
  },

  { name: "Switch", id: 2, url: "/pictures/switch.png" },

  {
    name: "Controller",
    id: 3,
    url: "/pictures/controller.png",
  },
];

function SideBar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);

    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="dnd">
      <div className="list">
        {componentsPicturesList.map((node) => (
          <div
            key={node.id}
            onDragStart={(event) => onDragStart(event, node.name)}
            draggable
          >
            <InfNode node={node} />
          </div>
        ))}
      </div>
    </div>
  );
}

export const InfNode = ({ node }) => (
  <div>
    <img
      src={node.url}
      width="50px"
      style={{
        marginTop: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        marginBottom: "15px",
      }}
    />
    <h4 style={{ textAlign: "center" }}>{node.name}</h4>
  </div>
);

export default SideBar;
