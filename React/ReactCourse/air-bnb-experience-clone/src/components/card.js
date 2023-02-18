import React from "react";
import icon from "../Star 1.png";


export default function Card(props) {
  let badgeText
  console.log(badgeText)
  if (props.item.openSpots === 0){
    badgeText =" SOLD OUT"
  }else if(props.location === "Online"){
    badgeText ="ONLINE"
  }
  return (
    <div className="cardRow">
      <div className="card">
        <img src={props.item.coverImg} alt="swimmer" className="card--img"></img>
        {badgeText && <p className="card--status">{badgeText}</p>}
        <span className="card--span">
          <img src={icon} alt="star icon"></img>
          <span>{props.item.stats.rating} </span>
          <span className="card--span--gray">({props.item.stats.reviewCount}) • {props.item.location}</span>
        </span>
        <p className="card--p">{props.item.title}</p>
        <span className="span--bold"> 
          From {props.item.price}$ <span>/ person</span>
        </span>
      </div>
    </div>
  );
}
