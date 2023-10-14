import React from "react";
import { useSelector } from "react-redux";

const Pass = () => {
  const bookings = useSelector((state) => state.bookings?.bookings[0]);

  const takeoffTime = bookings?.selectedTakeoffTime;
  const datetakeoff = new Date(takeoffTime);

  const hourstakeoff = datetakeoff.getUTCHours();
  const minutestakeoff = datetakeoff.getUTCMinutes();

  const timetakeoff = `${hourstakeoff
    .toString()
    .padStart(2, "0")}:${minutestakeoff.toString().padStart(2, "0")}`;

  const landingTime = bookings?.selectedLandingTime;
  const datelanding = new Date(landingTime);

  const hourslanding = datelanding.getUTCHours();
  const minuteslanding = datelanding.getUTCMinutes();

  const timelanding = `${hourslanding.toString().padStart(2, "0")}:${minuteslanding
    .toString()
    .padStart(2, "0")}`;

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
                <div className="lgdetail">{timetakeoff}</div>
              </div>
              <div className="departing">
                <div className="item">departing</div>
                <div className="smdetail">
                  {bookings.locationFrom.city}({bookings.locationFrom.code})
                </div>
              </div>
            </div>
            <div className="ticket-middle">
              <div className="flight">
                <div className="item">flight</div>
                <div className="lgdetail">{bookings.name}</div>
              </div>
              <div className="destination-time">
                <div className="item">destination time</div>
                <div className="lgdetail">{timelanding}</div>
              </div>
              <div className="destination">
                <div className="item">destination</div>
                <div className="smdetail">
                  {bookings.locationTo.city}({bookings.locationTo.code})
                </div>
              </div>
              <div className="serial">
                <div>{bookings.bookingId}</div>
              </div>
            </div>
            <div className="ticket-right">
              <div className="stub-flight">
                <div className="smitem">flight</div>
                <div className="exsmdetail">{bookings.name}</div>
              </div>
              <div className="stub-seat">
                <div className="smitem">seat</div>
                <div className="exsmdetail">{value}</div>
              </div>
              <div className="stub-depart">
                <div className="smitem">depart</div>
                <div className="exsmdetail">{timetakeoff}</div>
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
