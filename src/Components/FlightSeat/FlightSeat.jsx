import React from "react";

const FlightSeat = ({ seatNo, disabledseats, handleSeatSelection }) => {
  return (
    <li className={`row row--${seatNo}`}>
      <ol className="seats" type="A">
        {!disabledseats.includes(`${seatNo}A`) ? (
          <li className="seat">
            <input
              type="checkbox"
              id={`${seatNo}A`}
              onChange={() => handleSeatSelection(`${seatNo}A`)}
            />
            <label htmlFor={`${seatNo}A`}>{seatNo}A</label>
          </li>
        ) : (
          <li className="seat">
            <input type="checkbox" disabled id={`${seatNo}A`} />
            <label htmlFor={`${seatNo}A`}>Occupied</label>
          </li>
        )}
        {!disabledseats.includes(`${seatNo}B`) ? (
          <li className="seat">
            <input
              type="checkbox"
              id={`${seatNo}B`}
              onChange={() => handleSeatSelection(`${seatNo}B`)}
            />
            <label htmlFor={`${seatNo}B`}>{seatNo}B</label>
          </li>
        ) : (
          <li className="seat">
            <input type="checkbox" disabled id={`${seatNo}B`} />
            <label htmlFor={`${seatNo}B`}>Occupied</label>
          </li>
        )}
        {!disabledseats.includes(`${seatNo}C`) ? (
          <li className="seat">
            <input
              type="checkbox"
              id={`${seatNo}C`}
              onChange={() => handleSeatSelection(`${seatNo}C`)}
            />
            <label htmlFor={`${seatNo}C`}>{seatNo}C</label>
          </li>
        ) : (
          <li className="seat">
            <input type="checkbox" disabled id={`${seatNo}C`} />
            <label htmlFor={`${seatNo}C`}>Occupied</label>
          </li>
        )}
        {!disabledseats.includes(`${seatNo}D`) ? (
          <li className="seat">
            <input
              type="checkbox"
              id={`${seatNo}D`}
              onChange={() => handleSeatSelection(`${seatNo}D`)}
            />
            <label htmlFor={`${seatNo}D`}>{seatNo}D</label>
          </li>
        ) : (
          <li className="seat">
            <input type="checkbox" disabled id={`${seatNo}D`} />
            <label htmlFor={`${seatNo}D`}>Occupied</label>
          </li>
        )}
        {!disabledseats.includes(`${seatNo}E`) ? (
          <li className="seat">
            <input
              type="checkbox"
              id={`${seatNo}E`}
              onChange={() => handleSeatSelection(`${seatNo}E`)}
            />
            <label htmlFor={`${seatNo}E`}>{seatNo}E</label>
          </li>
        ) : (
          <li className="seat">
            <input type="checkbox" disabled id={`${seatNo}E`} />
            <label htmlFor={`${seatNo}E`}>Occupied</label>
          </li>
        )}
        {!disabledseats.includes(`${seatNo}F`) ? (
          <li className="seat">
            <input
              type="checkbox"
              id={`${seatNo}F`}
              onChange={() => handleSeatSelection(`${seatNo}F`)}
            />
            <label htmlFor={`${seatNo}F`}>{seatNo}F</label>
          </li>
        ) : (
          <li className="seat">
            <input type="checkbox" disabled id={`${seatNo}F`} />
            <label htmlFor={`${seatNo}F`}>Occupied</label>
          </li>
        )}
      </ol>
    </li>
  );
};

export default FlightSeat;
