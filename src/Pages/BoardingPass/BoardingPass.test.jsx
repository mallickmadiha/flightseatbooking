import React from "react";
// import {render, screen, cleanup} from "@testing-library/react";
import BoardingPass from "./BoardingPass";
import { renderWithProviders } from "../../utils/utils-for-tests";
import { BrowserRouter } from "react-router-dom";

test("should render BoardingPass component", () => {
  renderWithProviders(
    <BrowserRouter>
      <BoardingPass />
    </BrowserRouter>
  );
});
