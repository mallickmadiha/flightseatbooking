import React from "react";
import { BrowserRouter } from "react-router-dom";
import FlighCard from "./FlightCard";
import { renderWithProviders } from "../../utils/utils-for-tests";

test("should render FlighCard component", () => {
  renderWithProviders(
    <BrowserRouter>
      <FlighCard />
    </BrowserRouter>
  );
});
