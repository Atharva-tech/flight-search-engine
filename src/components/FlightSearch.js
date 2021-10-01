import React, { useState, useEffect } from "react";
import "./FlightSearch.css";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import flightData from "../flightData";

import Result from "./Result";

function FlightSearch() {
  //used useState hook to store data

  const [btnType, setBtnType] = useState("oneWay");
  const [passengerCount, setPassengerCount] = useState(1);
  const [priceRange, setPriceRange] = useState(10000);

  const [bookReturn, setBookReturn] = useState(false);
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [filteredData, setFilteredData] = useState("");

  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [returnFilteredData, setReturnFilteredData] = useState([]);

  const bookingType = [
    {
      name: "One way",
      id: "oneWay",
    },
    {
      name: "Return",
      id: "return",
    },
  ];

  // used useEffect hook to run on render of the page
  //priceRange is the dependency array
  useEffect(() => {
    handleFilter();
    returnFilter();
  }, [priceRange]);

  // this function handles the booking type
  const handleBookType = (id) => {
    setBtnType(id);
    if (id === "oneWay") {
      setIsSearchClicked(false);
      setBookReturn(false);
      setReturnDate("");
    } else if (id === "return") {
      setIsSearchClicked(false);
      setBookReturn(true);
    }
  };

  //this function handles passenger count
  const handleCount = (key) => {
    if (key === "add") {
      if (passengerCount >= 5) {
        return;
      }
      setPassengerCount(passengerCount + 1);
    } else if (key === "minus") {
      if (passengerCount === 1) {
        return;
      }
      setPassengerCount(passengerCount - 1);
    }
  };

  //date picker on focus
  const handleFocus = (e) => {
    e.currentTarget.type = "date";
  };
  const handleBlur = (e) => {
    e.currentTarget.type = "text";
  };

  //this function gives flights details according to our inputs
  const handleFilter = () => {
    let result = flightData.filter((data) => {
      if (
        data &&
        data.from.city &&
        data.to.city &&
        data.from.city
          .toLowerCase()
          .includes(originCity.trim().toLowerCase()) &&
        data.to.city
          .toLowerCase()
          .includes(destinationCity.trim().toLowerCase()) &&
        data.depart === departureDate &&
        data.price <= priceRange
      ) {
        return data;
      }
    });
    setFilteredData(result);
  };

  //this function gives return flights details according to our inputs
  const returnFilter = () => {
    let result = flightData.filter((data) => {
      if (
        data &&
        data.from &&
        data.from.city &&
        data.from.city
          .toLowerCase()
          .includes(destinationCity.trim().toLowerCase()) &&
        data.to &&
        data.to.city &&
        data.to.city.toLowerCase().includes(originCity.trim().toLowerCase()) &&
        data.depart === returnDate &&
        data.price <= priceRange
      ) {
        return data;
      }
    });
    setReturnFilteredData(result);
  };

  //this function handles search
  const handleSearch = () => {
    if (bookReturn && !returnDate) {
      alert("Return date cant be empty");
    } else if (!originCity) {
      alert("Origin city cant be empty");
    } else if (!destinationCity) {
      alert("Origin city cant be empty!");
    } else if (!departureDate) {
      alert("Departure date cant be empty!");
    }

    if (originCity && destinationCity && departureDate) {
      setIsSearchClicked(true);
      handleFilter();
      if (bookReturn && returnDate) {
        returnFilter();
      }
    }
  };

  //used card component and divided it into leftside and rightside

  //leftside contains one box

  //rightside contains another box
  return (
    <div className="card">
      <div className="leftSide">
        <div className="searchLeftSide">
          <div className="btns">
            <button
              className="btn1"
              key={bookingType[0].id}
              onClick={() => handleBookType(bookingType[0].id)}
            >
              One way
            </button>
            <button
              className="btn2"
              key={bookingType[1].id}
              onClick={() => handleBookType(bookingType[1].id)}
            >
              Return
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter origin city"
            onChange={(e) => setOriginCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter destination city"
            onChange={(e) => setDestinationCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter departure date"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          {btnType === "return" ? (
            <input
              type="text"
              placeholder="Enter return date"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          ) : null}

          <div className="passengerCount">
            <button onClick={() => handleCount("minus")}>-</button>
            <div>{passengerCount} passenger(s)</div>
            <button onClick={() => handleCount("add")}>+</button>
          </div>
          <button onClick={handleSearch} className="searchBtn">
            Search
          </button>
          <div style={{ marginBottom: "10px" }} />
        </div>
        <div className="sliderLeftSide">
          <h5>Refine flight search</h5>
          <div className="rangeSlider">
            <InputRange
              minValue={0}
              step={100}
              maxValue={10000}
              value={priceRange}
              formatLabel={(price) => `${price}`}
              onChange={(price) => setPriceRange(price)}
            />
          </div>
        </div>
      </div>

      <div className="rightSide">
        <Result
          filteredData={filteredData}
          bookReturn={bookReturn}
          isSearchClicked={isSearchClicked}
          returnFilteredData={returnFilteredData}
          passengerCount={passengerCount}
        />
      </div>
    </div>
  );
}

export default FlightSearch;
