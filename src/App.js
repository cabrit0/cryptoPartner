import Axios from "axios";
import React from "react";
import Head from "./components/Head/Head";
import Coins from "./components/Coins/Coins";
import Slider from "./components/Slider/Slider";
import "./App.css";

function App() {
  const [listOfCoins, setListOfCoins] = React.useState([]);
  const [searchWord, setSearchWord] = React.useState("");
  const [randomCoin, setRandomCoin] = React.useState();

  const getData = async () => {
    const res = await Axios.get(
      "https://openapi.coinstats.app/public/v1/coins"  // Using new base URL, old path
    );
    let coinsData = [];
    if (res.data && Array.isArray(res.data.coins)) {
      coinsData = res.data.coins;
    } else if (res.data && Array.isArray(res.data.result)) {
      coinsData = res.data.result;
    } else if (res.data && Array.isArray(res.data)) {
      coinsData = res.data;
    }
    // It's also possible the actual coin data is nested deeper, e.g., res.data.data.coins
    // or that the response is not an array directly but an object with a property containing the array.
    // This implementation only covers the requested cases.
    setListOfCoins(coinsData);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  function searchHandler(event) {
    const { value } = event.target;
    setSearchWord(value);
  }

  /* //do button function
  function nextCoin() {
    setIndex((index) => {
      let newIndex = index + 1;
      return newIndex;
    });
  }

  //do button function
  function prevCoin() {
    setIndex((index) => {
      let newIndex = index - 1;
      return newIndex;
    });
  } */

  function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];

    return item;
  }

  React.useEffect(() => {
    let timer = setTimeout(() => {
      setRandomCoin(getRandomItem(listOfCoins));
    }, 2500);

    return () => {
      clearTimeout(timer)
    }
  });

  //let rCoin = getRandomItem(listOfCoins)

  return (
    <div className="App">
      <Head name="searchInput" searchHandler={searchHandler} />
      {filteredCoins.length === 100 && <Slider className="slider" coin={randomCoin} />}
      <Coins items={filteredCoins} /> {/* filteredCoins */}
    </div>
  );
}

export default App;
