import React from "react";
import Signin from "./Signin";
import { BrowserRouter } from "react-router-dom";
import { renderWithProviders } from "../../../utils/utils-for-tests";

test("should render Signin component", () => {
  renderWithProviders(
    <BrowserRouter>
      <Signin />
    </BrowserRouter>
  );
});
