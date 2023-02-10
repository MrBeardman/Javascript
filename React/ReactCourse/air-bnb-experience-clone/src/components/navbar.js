import React from "react";
import logo from "../airbnb25.png";

export default function Navbar(){

    return(
        <navbar className="nav">
            <img src={logo}  className="nav--logo" alt="air bnb logo"></img>
        </navbar>

    )
}