import React from "react";
import Luggage from "./Luggage";
import { renderWithProviders } from "../../utils/utils-for-tests";
import { BrowserRouter } from "react-router-dom";

test("should render Luggage component", () => {
  renderWithProviders(
    <BrowserRouter>
      <Luggage />
    </BrowserRouter>
  );
});
