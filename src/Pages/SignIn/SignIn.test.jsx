import React from "react";
import SignIn from "./SignIn";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../../utils/utils-for-tests";

test("should render SignIn component", () => {
  renderWithProviders(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  );
});
