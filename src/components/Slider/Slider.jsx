import React from "react";
//import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './slider.css'

export default function Slider(props) {
  //console.log(props.coin);

  return (
    <div className="slider">
      {/* <FaChevronLeft className="arrow-left" /> */}
      {props.coin && (
        <div className="coin-slider">
          <img src={props.coin.icon} alt={props.coin.name} />
          <h3>{props.coin.name}</h3>
          <p>{props.coin.price.toFixed(2)}$</p>
          <h3 className={props.coin.priceChange1h > 0 ? "good" : "bad"}>
            {props.coin.priceChange1h}
          </h3>
        </div>
      )}
      {/* <FaChevronRight className="arrow-right" /> */}
    </div>
  );
}
