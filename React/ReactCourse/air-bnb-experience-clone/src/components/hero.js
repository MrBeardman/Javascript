import React from "react";
import heroImage from "../Group 77.png";

export default function Hero() {
  return <section className="hero">
    <img src={heroImage} alt="a lot of exeriences" className="hero--photo"></img>
    <h1 className="hero--h1">Online Experiences</h1>
    <p className="hero--p">Join unique interactive activities led by one-of-a-kind hosts—all without leaving home.</p>
  </section>;
}
