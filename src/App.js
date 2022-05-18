import Axios from "axios";
import React from "react";
import Head from "./components/Head/Head";
import Coins from "./components/Coins/Coins";
import Slider from "./components/Slider/Slider";
import "./App.css";

function App() {
  const [listOfCoins, setListOfCoins] = React.useState([]);
  const [searchWord, setSearchWord] = React.useState("");
  const [randomCoin, setRandomCoin] = React.useState({});

  const getData = async () => {
    const res = await Axios.get(
      "https://api.coinstats.app/public/v1/coins?skip=0"
    );
    setListOfCoins(res.data.coins);
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
    setTimeout(() => {
      setRandomCoin(getRandomItem(listOfCoins));
    }, 2500);
  });

  let rCoin = getRandomItem(listOfCoins)

  return (
    <div className="App">
      <Head name="searchInput" searchHandler={searchHandler} />
      {filteredCoins.length === 100 && <Slider coin={rCoin} />}
      <Coins items={filteredCoins} /> {/* filteredCoins */}
    </div>
  );
}

export default App;
