import React from 'react'
import {render, screen, cleanup} from "@testing-library/react";
import FlightSeat from './FlightSeat';

test("should render FlightSeat component", () =>{
    render(<FlightSeat/>);
})
