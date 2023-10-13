import React from 'react'
import {render, screen, cleanup} from "@testing-library/react";
import Luggage from './Luggage';

test("should render Luggage component", () =>{
    render(<Luggage/>);
})
