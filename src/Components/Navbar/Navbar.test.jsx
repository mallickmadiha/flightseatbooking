import React from "react";
import Navbar from "./Navbar";
import { renderWithProviders } from "../../utils/utils-for-tests";
import { BrowserRouter } from "react-router-dom";

test("should render Navbar component", () => {
  renderWithProviders(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
});
