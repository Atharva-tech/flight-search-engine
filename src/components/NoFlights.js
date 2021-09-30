import React from "react";
import { IoAirplaneOutline } from "react-icons/io5";
import "./NoFlights.css";

function NoFlights() {
  return (
    <div className="card">
      <div className="body">
        <IoAirplaneOutline size={60} />
        <h2>Search for flights</h2>
      </div>
    </div>
  );
}

export default NoFlights;
