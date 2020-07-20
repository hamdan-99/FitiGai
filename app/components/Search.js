import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import data from "../pages/data.js";

const Search = (props) => {
  let [services, setServices] = useState(props.data.services);
  let [location, setLocation] = useState("");
  let [title, setTitile] = useState("");
  const router = useRouter();
  let exTitle = title;
  let exLocation = location;
  const handleClick = (event) => {
    event.preventDefault();

    services.filter((i) => {
      if (
        i.title.toLowerCase() === title.toLowerCase() &&
        i.location.toLowerCase() === location.toLowerCase()
      ) {
        return [data.push(i), (exTitle = ""), (exLocation = "")];
      }
    });

    if (title.length === 0) {
      alert("Please fill Sport title & Location!");
      router.push({
        pathname: "/",
      });
    } else {
      router.push({
        pathname: "/results",
        query: { exTitle, exLocation },
      });
    }
  };
  return (
    <div className="searchContainer">
      <input
        type="text"
        className="searchItem searchtitle"
        placeholder="Sport"
        onChange={(e) => setTitile(e.target.value)}
      />
      <input
        type="text"
        className="searchItem searchLocation"
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleClick} type="submit" className="searchButton">
        <img className="searchIcon" src="/images/iconSearch.svg" />
      </button>
    </div>
  );
};

export default Search;
