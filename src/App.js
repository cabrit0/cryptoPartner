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
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [lastUpdate, setLastUpdate] = React.useState(null);
  const [showScroll, setShowScroll] = React.useState(false);
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'dark');

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await Axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
          },
        }
      );
      setListOfCoins(res.data);
      setLastUpdate(new Date());
    } catch (err) {
      setError("Erro ao carregar dados das moedas. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="App">
      <button onClick={toggleTheme} style={{position: 'fixed', top: 20, right: 20, zIndex: 1000, background: '#2a9d8f', color: 'white', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer'}}>
        {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <Head name="searchInput" searchHandler={searchHandler} />
      {lastUpdate && !loading && !error && (
        <div style={{textAlign: 'center', fontSize: '0.9rem', color: '#aaa', marginBottom: 10}}>
          Última atualização: {lastUpdate.toLocaleString()}
        </div>
      )}
      {loading && <div className="loading">Carregando moedas...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && filteredCoins.length === 100 && <Slider className="slider" coin={randomCoin} />}
      {!loading && !error && <Coins items={filteredCoins} />}
      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop} title="Voltar ao topo">↑</button>
      )}
    </div>
  );
}

export default App;
