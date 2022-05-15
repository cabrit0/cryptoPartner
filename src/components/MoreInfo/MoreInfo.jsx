import React from "react";
import { FaTwitter, FaGlobeAmericas } from "react-icons/fa";
import "./moreInfo.css";
import "../../App.css";

export default function MoreInfo(props) {
  console.log(props);
  return (
    <div className="overlay">
      <div className="modal">
        <div className="title">
          <img className="icon" src={props.icon} alt={props.name} />
          <h1>{props.name}!</h1>
          <div className="price">Price: {props.price} $</div>
          <div className="symbol">
            <h3>- {props.symbol} -</h3>
          </div>
        </div>
        <div className="average">
          <div className="hour">
            <p>Hour variation</p>
            <p className={props.price1h > 0 ? "good" : "bad"}>
              {props.price1h}
            </p>
          </div>
          <div className="day">
            <p>Day variation</p>
            <p className={props.price1d > 0 ? "good" : "bad"}>
              {props.price1d}
            </p>
          </div>
          <div className="week">
            <p>Week variation</p>
            <p className={props.price1w > 0 ? "good" : "bad"}>
              {props.price1w}
            </p>
          </div>
        </div>
        <div className="supply">
          <h4>Supply</h4>
          <p>Available: {props.availableSup}</p>
          <p>Total: {props.totalSup !== 0 ? props.totalSup : "Unknown" }</p>
        </div>

        <div className="social-media">
          <a href={props.twitter} className="twitter">
            <FaTwitter /> Twitter
          </a>
          <a href={props.website} className="website">
            <FaGlobeAmericas /> Website
          </a>
        </div>
        <div className="info">
          <div className="price-changes"></div>
        </div>
        <button onClick={props.toggle}>Close</button>
      </div>
    </div>
  );
}
