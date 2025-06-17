import React from "react";
import { FaSearch } from "react-icons/fa";
import './head.css'

function Head(props) {
  //console.log(props);
  return (
    <section className="Head">
      <h1 className="app-title"> CryptoPartner</h1>
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input placeholder="Search cryptocurrencies..." onChange={props.searchHandler} />
      </div>
    </section>
  );
}

export default Head;
