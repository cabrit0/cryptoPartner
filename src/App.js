import Axios from "axios";
import React from "react";
import Head from "./components/Head/Head";
import Coins from "./components/Coins/Coins";
import "./App.css";

function App() {
  const [listOfCoins, setListOfCoins] = React.useState([]);
  //const [filteredCoins, setFilteredCoins] = React.useState(listOfCoins);
  const [searchWord, setSearchWord] = React.useState("");

  const getData = async () => {
    const res = await Axios.get(
      "https://api.coinstats.app/public/v1/coins?skip=0"
    );
    setListOfCoins(res.data.coins)
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

  return (
    <div className="App">
      <Head name="searchInput" searchHandler={searchHandler} />
      <Coins items={filteredCoins} /> {/* filteredCoins */}
    </div>
  );
}

export default App;
