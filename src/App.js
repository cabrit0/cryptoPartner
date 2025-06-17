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
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const getData = async () => {
    try {
      const res = await Axios.get(
        "https://api.coinstats.app/public/v1/coins?skip=0"
      );
      setListOfCoins(res.data.coins);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching data: ", err);
      setError("Failed to load cryptocurrency data. Please check your connection or try again later.");
    } finally {
      setIsLoading(false);
    }
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
      {isLoading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <Head name="searchInput" searchHandler={searchHandler} />
          {filteredCoins.length === 100 && !searchWord && <Slider className="slider" coin={randomCoin} />} {/* Show slider only if not searching */}
          {
            !isLoading && !error && filteredCoins.length === 0 && searchWord !== "" ? (
              <div className="no-results-message">
                <p>No coins found for "{searchWord}".</p>
                <p>Please try a different search term.</p>
              </div>
            ) : (
              <Coins items={filteredCoins} />
            )
          }
        </>
      )}
    </div>
  );
}

export default App;
