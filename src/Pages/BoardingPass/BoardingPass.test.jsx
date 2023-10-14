import React from 'react'
// import {render, screen, cleanup} from "@testing-library/react";
import BoardingPass from './BoardingPass';
import { renderWithProviders } from "../../utils/utils-for-tests";


test("should render BoardingPass component", () =>{
    renderWithProviders(<BoardingPass/>);
})
