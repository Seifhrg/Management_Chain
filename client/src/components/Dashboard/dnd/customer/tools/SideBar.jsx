import React, { useState } from "react";

import "./dragDropCustomer.css";
//the logic for draggable components pictures
const componentsPicturesList = [
  { name: "FireWall", id: 1, url: "/pictures/firewall.png" },
  { name: "NAT", id: 2, url: "/pictures/nat.png" },
  { name: "IDS", id: 3, url: "/pictures/ids.png" },
  { name: "Source", id: 4, url: "/pictures/source.png" },
  { name: "Destination", id: 5, url: "/pictures/destination.png" },
];

function SideBar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);

    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="dndd">
      <div className="listt">
        {componentsPicturesList.map((node) => (
          <div
            key={node.id}
            onDragStart={(event) => onDragStart(event, node.name)}
            draggable
          >
            <SfcNode node={node} />
          </div>
        ))}
      </div>
    </div>
  );
}

export const SfcNode = ({ node }) => (
  <div>
    <img
      src={node.url}
      width="50px"
      style={{
        marginTop: "10px",
        marginLeft: "20px",
        marginRight: "20px",
        marginBottom: "10px",
      }}
    />
    <h4 style={{ textAlign: "center", marginTop: "10px" }}>{node.name}</h4>
  </div>
);

export default SideBar;
