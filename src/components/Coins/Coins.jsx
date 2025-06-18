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
            name={coin.name}
            icon={coin.image}
            price={coin.current_price}
            priceChange1d={coin.price_change_percentage_24h}
            priceChange1h={coin.price_change_percentage_1h_in_currency}
            priceChange1w={coin.price_change_percentage_7d_in_currency}
            symbol={coin.symbol}
            availableSupply={coin.circulating_supply}
            totalSupply={coin.total_supply}
          />
        );
      })}
    </section>
  );
}

export default Coins;
