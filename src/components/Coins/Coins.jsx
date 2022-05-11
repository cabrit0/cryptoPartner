import React from "react";
import Coin from "../Coin/Coin";
import './coins.css'

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
            icon={coin.icon}
            price={coin.price}
            priceChange1d={coin.priceChange1d}
            priceChange1h={coin.priceChange1h}
            priceChange1w={coin.priceChange1w}
            symbol={coin.symbol}
            availableSupply={coin.availableSupply}
            totalSupply={coin.totalSupply}
            twitterUrl={coin.twitterUrl}
            websiteUrl={coin.websiteUrl}
          />
        );
      })}
    </section>
  );
}

export default Coins;
