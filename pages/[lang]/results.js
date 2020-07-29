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

const Results = ({ services, coaches, title, location, props }) => {
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
  let [locations, setlocations] = useState([]);
  let [minPrice, setMinPrice] = useState(0);
  let [maxPrice, setMaxPrice] = useState(0);
  let [Result, setResult] = useState([]);

  let [errorSport, setErrorSport] = useState("");
  let [errorLocation, setErrorLocation] = useState("");
  let [errorMinPrice, setErrorMinPrice] = useState("");
  let [errorMaxPrice, setErrorMaxPrice] = useState("");

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
    const sportTitle = [];
    services.map((i) => {
      if (i.title.toLowerCase() === e.target.value.toLowerCase()) {
        sportTitle.push(i);
      } else {
        return;
      }
    });
    setSport(sportTitle);

    if (sport.length === 0) {
      setErrorSport(` ${e.target.value} : is not supported `);
    } else {
      return;
    }
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
    // this is result for match coach sport title and langugage supported
    const language = [];
    coaches.map((i) => {
      if (i.lang.slice(0, 2) === e.target.value) {
        language.push(i._id);
      } else {
        return null;
      }
    });
    setLanguage(language);
  };

  const handleChangeLocations = (e) => {
    e.preventDefault();
    const locations = [];

    services.map((i) => {
      if (i.location.toLowerCase() === e.target.value.toLowerCase()) {
        locations.pop();
        locations.push(e.target.value.toLowerCase());
      } else {
        return setErrorLocation(` ${e.target.value} : is not supported `);
      }
    });
    setlocations(locations);  
    

    if (locations.length === 0 && submit === false) {
      setValueLocation(e.target.value);
    } else if (locations.length === 0 && submit === true) {
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
    // this is result of sport and language and locations
    const result = [];

    sport.map((service) =>
      language.map((lang) =>
        locations.map((loc) => {
          if (service.location.toLowerCase() === loc) {
            if (service.owner === lang) {
              result.push(service);
              setResult(result);
            } else {
              return null;
            }
          } else {
            return null;
          }
        })
      )
    );
    if (result.length === 0) {
      if (language.length === 0) {
        if (locations.length === 0) {
          const values = sport.values();
          for (const value of values) {
            result.push(value);
            setResult(result);
          }
        } else if (locations.length !== 0) {
          sport.map((i) =>
            locations.map((l) => {
              if (i.location.toLowerCase() === l) {
                result.push(i);
                setResult(result);
              } else {
                return null;
              }
            })
          );
        } else {
          return null;
        }
      } else if (language.length !== 0) {
        sport.map((i) =>
          language.map((l) => {
            if (i.owner === l) {
              result.push(i);
              setResult(result);
            } else {
              return null;
            }
          })
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
    const priceresult = [];
    if (result.length !== 0) {
      if (minPrice.length !== 0 && maxPrice.length !== 0) {
        result.map((i) => {
          if (_.inRange(i.price, minPrice, maxPrice)) {
            priceresult.push(i);
            setResult(priceresult);
          } else {
            return;
          }
        });
      } else {
        return;
      }
    } else {
      return;
    }
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
  console.log("err", errorMaxPrice, errorMinPrice);
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
                    {submit && sport.length === 0 && (
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
                        <option defaultValue>Languages</option>
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
