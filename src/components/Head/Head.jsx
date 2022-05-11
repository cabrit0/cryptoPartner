import React from "react";
import './head.css'

function Head(props) {
  //console.log(props);
  return (
    <section className="Head">
      <h1 className="app-title"> CryptoPartner</h1>
      <input placeholder="Search coin.." onChange={props.searchHandler}></input>
    </section>
  );
}

export default Head;
