import React from "react";
import cardImg from "../image 12.png";
import icon from "../Star 1.png";
export default function Card() {
  return (
    <div className="cardRow">
      <div className="card">
        <img src={cardImg} alt="swimmer" className="card--img"></img>
        <p className="card--status">Sold out</p>
        <span className="card--span">
          <img src={icon} alt="star icon"></img>
          <span>5.0 </span>
          <span className="card--span--gray">(6) • USA</span>
        </span>
        <p className="card--p">Life lessons with Katie Zaferes</p>
        <span className="span--bold"> 
          From 136$ <span>/ person</span>
        </span>
      </div>
    </div>
  );
}
