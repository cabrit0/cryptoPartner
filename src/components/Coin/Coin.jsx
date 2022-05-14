import React from "react";
import MoreInfo from "../MoreInfo/MoreInfo";
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
      {showInfo ? null : <button onClick={toggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-info-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
      </button>}
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
