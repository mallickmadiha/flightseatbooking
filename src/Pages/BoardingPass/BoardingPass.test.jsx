import React from 'react'
import {render, screen, cleanup} from "@testing-library/react";
import BoardingPass from './BoardingPass';

test("should render BoardingPass component", () =>{
    render(<BoardingPass/>);
})
