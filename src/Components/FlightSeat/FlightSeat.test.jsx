import React from "react";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../../utils/utils-for-tests";
import FlightSeat from "./FlightSeat";

test("should render FlightSeat component", () => {
  renderWithProviders(
    <BrowserRouter>
      <FlightSeat />
    </BrowserRouter>
  );
});
