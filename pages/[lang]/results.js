import Card from "../../components/Cards";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Pagination from "../../components/pagination";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import WithLocaleWrapper from "../../hocs/withLocale";
import useTranslation from "../../hooks/useTranslation";
import { paginate } from "./../../utils/paginate";
import _ from "lodash";

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    marginTop: "5vh",
    paddingLeft: "40px",
    paddingRight: "40px",
  },
}));

const Results = ({ services, coaches, title, location }) => {
  const router = useRouter();
  const { locale, t } = useTranslation();
  const classes = useStyles();

  let [results, setResults] = useState(
    services.filter((i, e) => {
      if (title === i.title.toLowerCase()) {
        if (location === "") return i;
        else if (location === i.location.toLowerCase()) return i;
      } else return null;
    })
  );
  let [itemCount, setItemCount] = useState(results.length);
  let [pageSize, SetPageSize] = useState(12);
  let [currentPage, SetCurrentPage] = useState(1);
  let [sport, setSport] = useState([]);
  let [language, setLanguage] = useState([]);
  let [locations, setLocations] = useState([]);
  let [minPrice, setMinPrice] = useState(0);
  let [maxPrice, setMaxPrice] = useState(0);
  let [Result, setResult] = useState([]);

  let [errorSport, setErrorSport] = useState("");
  let [errorLocation, setErrorLocation] = useState("");
  let [errorMinPrice, setErrorMinPrice] = useState("");
  let [errorMaxPrice, setErrorMaxPrice] = useState("");
  let [errorSportLocation, setErrorSportLocation] = useState("");

  let [submit, setSubmit] = useState(false);

  let [valueSport, setValueSport] = useState("");
  let [valueLocation, setValueLocation] = useState("");
  let [valueMinPrice, setValueMinPrice] = useState(0);
  let [valueMaxPrice, setValueMaxPrice] = useState(0);

  let [querySport, setQuerySport] = useState("");
  let [queryLocation, setQueryLocation] = useState("");
  let [queryMinPrice, setQueryMinPrice] = useState(0);
  let [queryMaxPrice, setQueryMaxPrice] = useState(0);

  const handleChangeSport = (e) => {
    e.preventDefault();

    //  results for sport title only
    const sportTitle = [];
    //  filter the title sport from sport input
    services.map((i) => {
      if (i.title.toLowerCase() === e.target.value.toLowerCase()) {
        sportTitle.push(i);
      } else if (e.target.value.length > 0) {
        if (i.title.toLowerCase() !== e.target.value.toLowerCase()) {
          return setErrorSport(` ${e.target.value} : is not supported `);
        } else {
          return;
        }
      } else if (!e.target.value) {
        e.target.value = "";
        return setErrorSport(` ${e.target.value} : add some sport `);
      } else {
        return;
      }
    });

    setSport(sportTitle);

    // Checking error messages and make it rendered
    if (sport.length === 0 && submit === false) {
      setValueSport(e.target.value);
    } else if (sport.length === 0 && submit === true) {
      setQuerySport(e.target.value);
    } else {
      return null;
    }
  };

  const handleChangeLanguage = (e) => {
    e.preventDefault();
    // this is result for match coach sport title and langugages supported
    const languages = [];
    //  an array of all English coaches ID
    const en = [];
    // an array of all French Coaches ID
    const fr = [];

    //  filtering the coaches by supported languages
    coaches.filter((i) => {
      if (i.lang.slice(0, 2) === "en") {
        en.push(i._id);
      } else if (i.lang.slice(0, 2) === "fr") {
        fr.push(i._id);
      } else {
        return;
      }
    });
    // checking the language is selected by customer in Input filed with supported coaches Languages
    if (e.target.value === "en") {
      en.filter((i) => {
        return languages.push(i);
      });
    } else if (e.target.value === "fr") {
      fr.map((i) => {
        languages.push(i);
      });
    } else {
      en.map((e) => languages.push(e));
      fr.map((f) => languages.push(f));
    }
    setLanguage(languages);
  };

  const handleChangeLocations = (e) => {
    e.preventDefault();
    const point = [];
    const err = [];
    const values = services.values();
    for (const value of values) {
      if (e.target.value.length > 0) {
        if (
          value.location.trim().toLowerCase() ===
          e.target.value.trim().toLowerCase()
        ) {
          point.pop();
          point.push(e.target.value.trim());
          err.pop();
        } else if (
          value.location.trim().toLowerCase() !==
          e.target.value.trim().toLowerCase()
        ) {
          err.pop();
          err.push(` ${e.target.value} : is not supported `);
        } else {
          return;
        }
      } else {
        return;
      }
      if (point.length !== 0) {
        if (err.length == 0) {
          err.pop();
          setLocations(point[0]);
        } else if (point.length != 0) {
          err.pop();
        } else {
          return null;
        }
      } else {
        setErrorLocation(err);
      }
    }
    if (locations != null && submit === false) {
      setValueLocation(e.target.value);
    } else if (locations != null && submit === true) {
      setQueryLocation(e.target.value);
    } else {
      return null;
    }
  };

  const handleChangePriceMin = (e) => {
    e.preventDefault();
    const minPrice = [];
    const number = services.map((i) => i.price);
    const min = Math.min(...number);
    const max = Math.max(...number);

    if (_.inRange(e.target.value, min, max)) {
      minPrice.pop();
      minPrice.push(e.target.value);
    } else {
      return setErrorMinPrice(`${e.target.value} : is out of range`);
    }

    setMinPrice(minPrice);
    minPrice.length !== 0 ? setErrorMinPrice("") : null;

    if (minPrice.length === 0 && submit === false) {
      setValueMinPrice(e.target.value);
    } else if (minPrice.length === 0 && submit === true) {
      setQueryMinPrice(e.target.value);
    } else {
      return null;
    }
  };

  const handleChangePriceMax = (e) => {
    e.preventDefault();
    const maxPrices = [];
    const number = services.map((i) => i.price);
    const min = Math.min(...number);
    const max = Math.max(...number);

    if (_.inRange(e.target.value, min, max)) {
      maxPrices.pop();
      maxPrices.push(e.target.value);
    } else {
      return setErrorMaxPrice(`${e.target.value} : is out of range`);
    }
    setMaxPrice(maxPrices);
    maxPrices.length !== 0 ? setErrorMaxPrice("") : null;
    if (maxPrice.length === 0 && submit === false) {
      setValueMaxPrice(e.target.value);
    } else if (maxPrice.length === 0 && submit === true) {
      setQueryMaxPrice(e.target.value);
    } else {
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  search only Services based on Sports Title
    const sportResults = [];
    const sportTitles = sport.values();
    for (const sportTitle of sportTitles) {
      if (sportTitle) {
        sportResults.push(sportTitle);
      } else {
        return;
      }
      setResults(sportResults);
    }
    //  search only Coaches based on Languages
    const languageCoaches = language.values();
    const languageResults = [];
    for (const lang of languageCoaches) {
      services.map((service) => {
        if (lang === service.owner) {
          languageResults.push(service);
        } else {
          return;
        }
      });
      setResults(languageResults);
    }

    //  search only Services based on Location
    const locationsResults = [];
    services.map((service, e) => {
      if (locations.toLowerCase() === service.location.toLowerCase()) {
        locationsResults.push(service);
      } else {
        return;
      }
    });
    setResults(locationsResults);

    //  search only Services based on Price
    const priceResult = [];
    services.map((service) => {
      if (_.inRange(service.price, minPrice, maxPrice)) {
        priceResult.push(service);
      } else {
        return;
      }
    });
    setResults(priceResult);

    //  search only Services based on Sport Title && Language
    const sportLang = [];
    for (const serviceTitle of sportTitles) {
      language.map((lang) => {
        if (serviceTitle.owner === lang) {
          sportLang.push(serviceTitle);
        } else {
          return;
        }
      });
      setResults(sportLang);
    }

    //  search only Services based on Sport Title && Location
    const sportLocation = [];
    sport.map((service) => {
      if (service.location.toLowerCase() === locations.toLowerCase()) {
        sportLocation.push(service);
      } else if (location.length > 0) {
        if (service.location.toLowerCase() !== locations.toLowerCase()) {
          setErrorSportLocation(
            `${service.title} is not supported in ${locations}`
          );
        } else {
          return;
        }
      } else {
        return;
      }
    });
    setResults(sportLocation);

    //  search on Services based on Sport Title && Price
    const sportLanguage = [];
    sport.map((service) => {
      if (_.inRange(service.price, minPrice, maxPrice)) {
        sportLanguage.push(service);
      }
    });
    setResults(sportLanguage);

    //  search on Services based on Sport Title && Language && location
    const sportLanguageLocation = [];
    sport.map((service) =>
      language.map((lang) => {
        if (service.owner === lang) {
          if (service.location.toLowerCase() === locations.toLowerCase()) {
            sportLanguageLocation.push(service);
          }
        }
      })
    );
    setResults(sportLanguageLocation);

    //  search on Services based on Sport Title && Language && Price
    const sportLanguagePrice = [];
    sport.map((service) =>
      language.map((lang) => {
        if (service.owner === lang) {
          if (_.inRange(service.price, minPrice, maxPrice)) {
            sportLanguagePrice.push(service);
          }
        }
      })
    );
    setResults(sportLanguagePrice);

    //  search on Services based on Sport All Fileds
    const sportLanguageLocationPrice = [];
    sport.map((service) =>
      language.map((lang) => {
        if (service.owner === lang) {
          if (service.location.toLowerCase() === locations.toLowerCase()) {
            if (_.inRange(service.price, minPrice, maxPrice)) {
              sportLanguageLocationPrice.push(service);
            }
          }
        }
      })
    );
    setResults(sportLanguageLocationPrice);

    //  search on Services based on Sport && Location && Price
    const sportLocationPrice = [];
    sport.map((service) => {
      if (service.location.toLowerCase() === locations.toLowerCase()) {
        if (_.inRange(service.price, minPrice, maxPrice)) {
          sportLocationPrice.push(service);
        }
      }
    });
    setResults(sportLocationPrice);

    //  search on Services based on  Location && Language
    const languageLocation = [];
    services.map((service) =>
      language.map((lang) => {
        if (service.location.toLowerCase() === locations.toLowerCase()) {
          if (service.owner === lang) {
            languageLocation.push(service);
          }
        }
      })
    );
    setResults(languageLocation);

    //  search on Services based on  Price && Language
    const languagePrice = [];
    services.map((service) =>
      language.map((lang) => {
        if (service.owner === lang) {
          if (_.inRange(service.price, minPrice, maxPrice)) {
            languagePrice.push(service);
          }
        }
      })
    );
    setResults(languagePrice);

    //  search on Services based on  Price && Location
    const locationPrice = [];
    services.map((service) => {
      if (service.location.toLowerCase() === locations.toLowerCase()) {
        if (_.inRange(service.price, minPrice, maxPrice)) {
          locationPrice.push(service);
        }
      }
    });
    setResults(locationPrice);
  };

  useEffect(() => {
    if (results.length === 0)
      setResults(services.map((i, e) => (e < 32 ? i : null)));
  }, [results]);

  const handlePageChange = (page) => {
    SetCurrentPage(page);
  };

  const handleClick = (coachID, serviceID) => {
    router.push({
      pathname: `/${locale}/profile`,
      query: {
        _id: serviceID._id,
        location: serviceID.location,
        owner: serviceID.owner,
        title: serviceID.title,
        description: serviceID.description,
        price: serviceID.price,
        address: serviceID.address,
        lang: coachID.lang,
        firstName: coachID.firstName,
        lastName: coachID.lastName,
      },
    });
  };

  useEffect(() => {}, [results]);

  useEffect(() => {
    if (Result.length !== 0) {
      setItemCount(Result.length);
      setResults(Result);
    } else {
      return;
    }
  }, [Result]);

  useEffect(() => {
    if (valueSport !== querySport) {
      setSubmit(false);
    } else if (valueLocation !== queryLocation) {
      setSubmit(false);
    } else {
      return;
    }
  }, [querySport, queryLocation]);


  return (
    <Layout>
      <div className="wrapper">
        <div className="container">
          <div className="searchMain">
            <div className="advancedSearch">
              <form onSubmit={handleSubmit}>
                <div className="sport">
                  <div className="form-group row">
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        onChange={handleChangeSport}
                        placeholder="Sport"
                        type="text"
                      />
                    </div>
                  </div>
                  <div>
                    {submit && errorSport && sport.length === 0 && (
                      <div className="Error">{errorSport}</div>
                    )}
                  </div>
                </div>

                <div className="language">
                  <div className="form-group row">
                    <div className="col-md-12">
                      <select
                        className="form-control"
                        onChange={handleChangeLanguage}
                      >
                        <option defaultValue>All Languages</option>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="locations">
                  <div className="form-group row">
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        onChange={handleChangeLocations}
                        placeholder="locations"
                        type="text"
                      />
                    </div>
                  </div>
                  {submit && locations.length === 0 && (
                    <div className="Error">
                      <p>{errorLocation}</p>
                    </div>
                  )}
                </div>

                <div className="priceMin">
                  <div className="form-group row">
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        onChange={handleChangePriceMin}
                        placeholder="Min Price"
                        type="number"
                      />
                    </div>
                  </div>
                  {submit && errorMinPrice && (
                    <div className="Error">
                      <p>{errorMinPrice}</p>
                    </div>
                  )}
                </div>

                <div className="priceMax">
                  <div className="form-group row">
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        onChange={handleChangePriceMax}
                        placeholder="Max Price"
                        type="number"
                      />
                    </div>
                  </div>
                  {submit && errorMaxPrice && (
                    <div className="Error">
                      <p>{errorMaxPrice}</p>
                    </div>
                  )}
                </div>
                <button
                  className="btn btn-primary "
                  onClick={() => setSubmit(true)}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div>
            {submit && errorSportLocation && location.length != 0 && (
              <p>{errorSportLocation}</p>
            )}
          </div>
          <Grid
            container
            spacing={5}
            justify="center"
            className={classes.gridContainer}
          >
            {paginate(results, currentPage, pageSize).map((card) =>
              coaches.map((coach) =>
                card.owner === coach._id ? (
                  <Grid
                    key={card._id}
                    onClick={() => handleClick(coach, card)}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                  >
                    <Card card={card} coachName={coach} key={card._id} />
                  </Grid>
                ) : null
              )
            )}
          </Grid>

          <div className="pagination">
            <Pagination
              className="pagination"
              itemsCount={itemCount}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
        <style jsx>
          {`
            .wrapper {
              background-color: aliceblue;
            }
            .Error {
              color: red;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

Results.getInitialProps = async ({ query }) => {
  const coaches_res = await fetch(`${urlEndpoint}coach/coaches`);
  const coaches = await coaches_res.json();
  const services_res = await fetch(`${urlEndpoint}searches`);
  const services = await services_res.json();

  return {
    coaches,
    services,
    title: query.title,
    location: query.location,
  };
};

export default WithLocaleWrapper(Results);
