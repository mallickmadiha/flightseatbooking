import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/utils-for-tests";
import { BrowserRouter } from "react-router-dom";
import AddFlight from "./AddFlight";

test("should render AddFlight component", () => {
  renderWithProviders(
    <BrowserRouter>
      <AddFlight />
    </BrowserRouter>
  );
  const AddFlightElement = screen.getByTestId("addflight");
  expect(AddFlightElement).toBeInTheDocument();
});
