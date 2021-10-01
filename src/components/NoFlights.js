import React from "react";

import { BsSearch } from "react-icons/bs";
import "./NoFlights.css";

function NoFlights() {
  return (
    <div className="card">
      <div className="body">
        <BsSearch size={60} className="searchIcon" />
        <h2>Search for flights</h2>
      </div>
    </div>
  );
}

export default NoFlights;
