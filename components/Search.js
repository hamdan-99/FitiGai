import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import data from "../utils/data";
import useTranslation from "../hooks/useTranslation";
import fetch from "node-fetch";

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`


export default function Search(props) {
  let [location, setLocation] = useState("");
  let [title, setTitile] = useState("");

  const router = useRouter();
  const { locale, t } = useTranslation();

  let exTitle = title;
  let exLocation = location;
  console.log("ser", props);
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
        query: { exTitle, exLocation },
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

export async function getStaticProps() {
  const response = await fetch(`${urlEndpoint}service/`);
  const services = await response.json();
  console.log("services", services);

  return {
    props: { services },
  };
}
