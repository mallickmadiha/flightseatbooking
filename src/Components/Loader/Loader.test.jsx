import React from 'react'
import {render, screen, cleanup} from "@testing-library/react";
import Loader from "./Loader";

test("should render AddFlight component", () =>{
    render(<Loader/>);
})
