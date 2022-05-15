import React from "react";
import MoreInfo from "../MoreInfo/MoreInfo";
import { FaInfo } from "react-icons/fa";
import "./coin.css";

function Coin({
  id,
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
  const [showInfo, setShowInfo] = React.useState(false);

  function toggle() {
    setShowInfo((prevState) => !prevState);
  }

  return (
    <div className="coin" id={id}>
      <h2> {name}</h2>
      <img src={icon} alt={name} />
      <h3 className="color"> Price: {price.toFixed(2)}</h3>
      <h3 className={priceChange1h > 0 ? "good" : "bad"}> {priceChange1h} </h3>
      {showInfo ? null : (
        <button onClick={toggle}>
          <FaInfo />
        </button>
      )}
      {showInfo && (
        <MoreInfo
          name={name}
          icon={icon}
          price={price.toFixed(2)}
          price1h={priceChange1h}
          price1d={priceChange1d}
          price1w={priceChange1w}
          availableSup={availableSupply.toFixed(0)}
          totalSup={totalSupply.toFixed(0)}
          twitter={twitterUrl}
          website={websiteUrl}
          symbol={symbol}
          toggle={toggle}
        />
      )}
    </div>
  );
}

export default Coin;
