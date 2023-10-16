import React from "react";
import Pass from "./Pass";
import { renderWithProviders } from "../../utils/utils-for-tests";
import { BrowserRouter } from "react-router-dom";

test("should render Pass component", () => {
  renderWithProviders(
    <BrowserRouter>
      <Pass />
    </BrowserRouter>
  );
});
