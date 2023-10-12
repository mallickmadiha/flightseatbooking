import React from "react";
import { useSelector } from "react-redux";

const Pass = () => {
  const bookings = useSelector((state) => state.bookings?.bookings[0]);
  console.log(bookings);
  return (
    <>
      {bookings?.seats?.booked.map((value, index) => {
        return (
          <div key={index} className="ticket text-right mb-10">
            <div className="ticket-left">
              <div className="corner-seat-container">
                <div className="item">seat</div>
                <div className="lgdetail">{value}</div>
              </div>
              <div className="airplane-container">
                <img
                  src="https://assets.codepen.io/1026437/blackAirplane.png"
                  alt="airplane-img"
                />
              </div>
              <div className="departure-time">
                <div className="item">departure time</div>
                <div className="lgdetail">5:19am</div>
              </div>
              <div className="departing">
                <div className="item">departing</div>
                <div className="smdetail">{bookings.locationFrom.city}({bookings.locationFrom.code})</div>
              </div>
            </div>
            <div className="ticket-middle">
              <div className="passenger-name">
                <div className="item">passenger</div>
                <div className="smdetail">smith, john r</div>
              </div>
              <div className="gate">
                <div className="item">gate</div>
                <div className="lgdetail">l22</div>
              </div>
              <div className="flight">
                <div className="item">flight</div>
                <div className="lgdetail">402rd</div>
              </div>
              <div className="destination">
                <div className="item">destination</div>
                <div className="smdetail">{bookings.locationTo.city}({bookings.locationTo.code})</div>
              </div>
              <div className="group">
                <div className="item">group</div>
                <div className="smdetail">3</div>
              </div>
              <div className="serial">
                <div>z8 4653 402 16waj 4798p</div>
              </div>
            </div>
            <div className="ticket-right">
              <div className="stub-flight">
                <div className="smitem">flight</div>
                <div className="exsmdetail">402rd</div>
              </div>
              <div className="stub-seat">
                <div className="smitem">seat</div>
                <div className="exsmdetail">25a</div>
              </div>
              <div className="stub-depart">
                <div className="smitem">depart</div>
                <div className="exsmdetail">5:19am</div>
              </div>
              <div className="stub-passenger">
                <div className="smitem">passenger</div>
                <div className="exsmdetail">Smith, John, R</div>
              </div>
              <div className="barcode">3859384847</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Pass;
