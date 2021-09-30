import React from "react";
import "./Navbar.css";
import { IoAirplaneOutline } from "react-icons/io5";
import "animate.css";

function Navbar() {
  return (
    <div className="navbar">
      <IoAirplaneOutline className="planeIcon" size={40} />
      <h2>Flight Search Engine</h2>
    </div>
  );
}

export default Navbar;
