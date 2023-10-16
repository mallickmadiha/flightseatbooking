import React from "react";
import { renderWithProviders } from "./utils/utils-for-tests";
import App from "./App";

test("should render App component", () => {
  renderWithProviders(<App />);
});
