import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import data from "../utils/data";
import useTranslation from "../hooks/useTranslation";
import fetch from "node-fetch";

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

export default function Search() {
  let [location, setLocation] = useState("");
  let [title, setTitile] = useState("");

  const router = useRouter();
  const { locale, t } = useTranslation();

  const handleClick = (event) => {
    event.preventDefault();

    if (title.length === 0) {
      alert(t("FillAlert"));
      router.push({
        pathname: `/${locale}`,
      });
    } else {
      router.push({
        pathname: `/${locale}/results`,
        query: { title, location: location.toLowerCase() },
      });
    }
  };
  return (
    <div className="searchContainer">
      <input
        type="text"
        className="searchItem searchtitle"
        placeholder={t("Sport")}
        onChange={(e) => setTitile(e.target.value)}
      />
      <input
        type="text"
        className="searchItem searchLocation"
        placeholder={t("Location")}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleClick} type="submit" className="searchButton">
        <img className="searchIcon" src="/images/iconSearch.svg" />
      </button>
    </div>
  );
}


