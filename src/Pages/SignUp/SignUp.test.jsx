import React from "react";
import SignUp from "./SignUp";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../../utils/utils-for-tests";

test("should render SignUp component", () => {
  renderWithProviders(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
});
