import React from "react";
import Meal from "./Meal";
import { renderWithProviders } from "../../utils/utils-for-tests";
import { BrowserRouter } from "react-router-dom";

test("should render Meal component", () => {
  renderWithProviders(
    <BrowserRouter>
      <Meal />
    </BrowserRouter>
  );
});
