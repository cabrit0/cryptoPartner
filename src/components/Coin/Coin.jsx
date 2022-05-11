import React from "react";
import "./coin.css";

function Coin({
  name,
  icon,
  price,
  priceChange1d,
  priceChange1h,
  priceChange1w,
  availableSupply,
  totalSupply,
  twitterUrl,
  websiteUrl,
  symbol,
}) {
  //console.log(typeof priceChange1h);
  return (
    <div className="coin">
      <h2> {name}</h2>
      <img src={icon} alt={name} />
      <h3 className="color"> Price: {price.toFixed(2)}</h3>
      <h3 className={priceChange1h > 0 ? 'good' : 'bad'}> {priceChange1h} </h3>
      <h3>Available Supply: {availableSupply}</h3>
      <h3>Total Supply: {totalSupply ? totalSupply : "Unknown"}</h3>
      <h3> Symbol: {symbol}</h3>
    </div>
  );
}

export default Coin;
