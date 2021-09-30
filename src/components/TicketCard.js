import React from "react";
import "./TicketCard.css";
import { IoAirplaneOutline } from "react-icons/io5";
import { BsCircleFill } from "react-icons/bs";

function TicketCard(props) {
  const { filteredData, passengerCount } = props;

  const handleBooking = () => {
    alert(`Ticked Booked for ${passengerCount} passenger(s)`);
  };

  return (
    <div>
      {filteredData.map((data, i) => {
        return (
          <div className="ticketCard" key={i}>
            <div className="ticketBody">
              <div className="ticketPriceAndQty">
                <span>
                  <b>₹ {data.price * passengerCount}</b>
                </span>
                <div style={{ marginLeft: "10px" }} />
                <span>
                  <b>{passengerCount} P</b>
                </span>
              </div>
              <div className="ticketDetails">
                <span>
                  <b>
                    <div className="ticketJourney">
                      {data.from.short}

                      <BsCircleFill size={5} color="green" className="icon" />
                      <IoAirplaneOutline
                        size={20}
                        color="grey"
                        className="icon"
                      />
                      <BsCircleFill size={5} color="tomato" className="icon" />

                      {data.to.short}
                    </div>
                  </b>
                </span>

                <div>{data.code}</div>
                <div>Depart :{data.departTime}</div>
                <div>Arrive :{data.arrivalTime}</div>
              </div>

              <div className="ticketImgAndBtn">
                <img src={data.flightImg} alt="" height="120px" width="120px" />
                <button onClick={handleBooking}>Book</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TicketCard;
