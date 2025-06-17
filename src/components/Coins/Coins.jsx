import React from "react";
import Coin from "../Coin/Coin";
import "./coins.css";

function Coins(props) {
  //console.log(props.items);

  return (
    <section className="coins">
      {/* Display mapped coins */}
      {props.items.map((coin) => {
        return (
          <Coin
            key={coin.id}
            id={coin.id} /* Pass id prop for Coin.jsx if it uses it directly */
            name={coin.name}
            icon={coin.image} /* Updated from coin.icon */
            price={coin.current_price || 0} /* Updated from coin.price, ensure default if undefined */
            priceChange1h={coin.price_change_percentage_1h_in_currency || 0} /* Updated */
            priceChange1d={coin.price_change_percentage_24h_in_currency || coin.price_change_percentage_24h || 0} /* Updated */
            priceChange1w={coin.price_change_percentage_7d_in_currency || 0} /* Updated */
            symbol={coin.symbol}
            availableSupply={coin.circulating_supply || 0} /* Updated */
            totalSupply={coin.total_supply || 0} /* Updated */
            twitterUrl={null} /* Set to null as not available in this API endpoint */
            websiteUrl={null} /* Set to null */
          />
        );
      })}
    </section>
  );
}

export default Coins;
