import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/utils-for-tests";
import { BrowserRouter } from "react-router-dom";
import Booking from "./Booking";

test("should render Booking component", () => {
  renderWithProviders(
    <BrowserRouter>
      <Booking />
    </BrowserRouter>
  );
  const BookingElement = screen.getByTestId("booking");
  expect(BookingElement).toBeInTheDocument();
});
