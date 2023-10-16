import React from "react";
import FlightBook from "./FlightBook";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../../utils/utils-for-tests";

test("should render FlightBook component", () => {
  renderWithProviders(
    <BrowserRouter>
      <FlightBook />
    </BrowserRouter>
  );
});
