import React from "react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../../../utils/utils-for-tests";

test("should render Home component", () => {
  renderWithProviders(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
});
