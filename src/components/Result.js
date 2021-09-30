import React from "react";
import NoFlights from "./NoFlights";
import { IoIosArrowForward } from "react-icons/io";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import "./Result.css";
import TicketCard from "./TicketCard";

function Result(props) {
  const {
    filteredData,
    bookReturn,
    isSearchClicked,
    returnFilteredData,
    passengerCount,
  } = props;
  return (
    <div className="resultCard">
      {!isSearchClicked &&
      filteredData.length === 0 &&
      returnFilteredData.length === 0 ? (
        <NoFlights />
      ) : isSearchClicked &&
        filteredData.length === 0 &&
        returnFilteredData.length === 0 ? (
        <div style={{ marginTop: "10%" }}>
          {" "}
          <BsFillExclamationCircleFill color="tomato" size={30} />
          <h3>Flights Not found</h3>
        </div>
      ) : (
        <div>
          <div className="flightsHeader">
            <h3>Available Flights</h3>
            <IoIosArrowForward size={35} color="#0066b2" className="icon" />
          </div>
          <div>
            {bookReturn && isSearchClicked ? (
              <div className="flightDeptAndReturn">
                <div className="flightDept">
                  <h4>Departure Flight</h4>
                  <p>{filteredData[0].depart}</p>
                  <TicketCard
                    filteredData={filteredData}
                    passengerCount={passengerCount}
                  />
                </div>
                {returnFilteredData.length && returnFilteredData ? (
                  <div className="flightReturn" style={{ marginLeft: "-55px" }}>
                    <h4>Return flight</h4>
                    <p>{returnFilteredData[0].depart}</p>
                    <TicketCard
                      filteredData={returnFilteredData}
                      passengerCount={passengerCount}
                    />
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <div
                  className="flightDept"
                  style={{ marginLeft: "25px", marginTop: "-10px" }}
                >
                  <h4>Departure flight</h4>
                  <p>{filteredData[0].depart}</p>
                  <TicketCard
                    filteredData={filteredData}
                    passengerCount={passengerCount}
                  />
                </div>
              </>
            )}
          </div>

          <div className="flightsBody"></div>
        </div>
      )}
    </div>
  );
}

export default Result;
