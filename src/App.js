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
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
            sparkline: false,
            price_change_percentage: '1h,24h,7d'
          }
        }
      );
      setListOfCoins(res.data); // CoinGecko API returns an array directly
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching data: ", err);
      // Attempt to get more specific error message if available
      const errorMessage = err.response && err.response.data && err.response.data.error
        ? `Failed to load cryptocurrency data: ${err.response.data.error}`
        : "Failed to load cryptocurrency data. Please check your connection or try again later.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    // Ensure coin and coin.name are not null before calling toLowerCase()
    return coin && coin.name && coin.name.toLowerCase().includes(searchWord.toLowerCase());
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
    // Ensure arr is not empty and is an array
    if (!Array.isArray(arr) || arr.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];

    return item;
  }

  React.useEffect(() => {
    // Ensure listOfCoins is populated before setting a random coin
    if (listOfCoins && listOfCoins.length > 0) {
      let timer = setTimeout(() => {
        setRandomCoin(getRandomItem(listOfCoins));
      }, 2500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [listOfCoins]); // Add listOfCoins as a dependency

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
          {/* Update condition for Slider: check if randomCoin is set and searchWord is empty */}
          {randomCoin && !searchWord && listOfCoins.length > 0 && <Slider className="slider" coin={randomCoin} />}
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
