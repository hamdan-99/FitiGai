import Card from "../../components/Cards";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Pagination from "../../components/pagination";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import WithLocaleWrapper from "../../hocs/withLocale";
import useTranslation from "../../hooks/useTranslation";
import AdvancedSearch from "../../components/advancedSearch";

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridContainer: {
    marginTop: "3rem",
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
      } else if (title !== i.title.toLowerCase()) return e < 32;
      else return null;
    })
  );
  let [sport, setSport] = useState([]);
  let [language, setLanguage] = useState([]);
  let [locations, setlocations] = useState([]);
  let [minPrice, setMinPrice] = useState([]);
  let [maxPrice, setMaxPrice] = useState([]);
  let [Result, setResult] = useState([]);
  let [error, setError] = useState([]);

  const handleChangeSport = (e) => {
    e.preventDefault();
    const sport = [];
    const sportError = [];
    services.map((i) => {
      if (i.title.toLowerCase() === e.target.value.toLowerCase()) {
        sport.push(i);
      } else if (i.title.toLowerCase() !== e.target.value.toLowerCase()) {
        sportError.push(` ${e.target.value} is not supported Sport`);
      } else {
        return null;
      }
    });
    setSport(sport);
    error.push(sportError[0]);
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
    const locationsError = [];
    services.map((i) => {
      if (i.location.toLowerCase() === e.target.value.toLowerCase()) {
        locations.pop();
        locations.push(e.target.value.toLowerCase());
      } else if (i.location.toLowerCase() !== e.target.value.toLowerCase()) {
        locationsError.pop();
        locationsError.push(` ${e.target.value} is not supported locations`);
      } else {
        return null;
      }
    });
    setlocations(locations);
    error.push(locationsError[0]);
  };

  const handleChangePriceMin = (e) => {
    e.preventDefault();
    const minPrice = [];
    const minError = [];
    const number = services.map((i) => i.price);
    const min = Math.min(...number);
    const max = Math.max(...number);

    if (_.inRange(e.target.value, min, max)) {
      minPrice.pop();
      minPrice.push(e.target.value);
    } else if (!_.inRange(e.target.value, min, max)) {
      return [minError.push(`there is no less than min ${e.target.value}`)];
    } else {
      return null;
    }
    setMinPrice(minPrice);
    error.push(minError[0]);
  };

  const handleChangePriceMax = (e) => {
    e.preventDefault();
    const maxPrice = [];
    const maxError = [];
    const number = services.map((i) => i.price);
    const min = Math.min(...number);
    const max = Math.max(...number);

    if (_.inRange(e.target.value, min, max)) {
      maxPrice.pop();
      maxPrice.push(e.target.value);
    } else if (!_.inRange(e.target.value, min, max)) {
      maxError.push(`there is no greater than  ${e.target.value}`);
    } else {
      return null;
    }
    setMaxPrice(maxPrice);
    error.push(maxError[0]);
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
            return null;
          }
        });
      } else {
        return null;
      }
    } else {
      return null;
    }
  };


  let [pageSize, SetPageSize] = useState(9);
  let [currentPage, SetCurrentPage] = useState(1);

  useEffect(() => {
    SetCurrentPage(1);
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
  console.log("result", Result);

  useEffect(() => {
    if (Result.length !== 0) {
      setResults(Result);
    }
  }, [Result]);

  return (
    <Layout>
      <div className="wrapper">
        <div className="container">
          <div>
            <form onSubmit={handleSubmit}>
              <div className="sport">
                <input onChange={handleChangeSport} placeholder="Sport" />
                {/* List Of Sports we could use */}
                {/* tennis      */}
                {/* Volleyball  */}
                {/* Football    */}
                {/* Badminton   */}
                {/* Disability  */}
                {/* Diving      */}
                {/* Boxing      */}
                {/* Judo        */}
                {/* Swimming    */}
                {/* Table Tennis*/}
                {/* Taekwondo   */}
                {/* Wrestling   */}
              </div>

              <div className="language">
                <select onChange={handleChangeLanguage}>
                  <option defaultValue>Choose Language</option>
                  <option value="en">English</option>
                  <option value="fr">French</option>
                </select>

                {/*Languages  */}
                {/* Dutch  */}
                {/* French */}
                {/* English*/}
              </div>

              <div className="locations">
                <input
                  onChange={handleChangeLocations}
                  placeholder="locations"
                />
                {/*Languages   */}
                {/* brussels */}
                {/*  Leuven  */}
                {/*   Paris  */}
              </div>

              <div className="priceMin">
                <input
                  onChange={handleChangePriceMin}
                  placeholder="Min Price"
                  type="number"
                />
              </div>

              <div className="priceMax">
                <input
                  onChange={handleChangePriceMax}
                  placeholder="Max Price"
                  type="number"
                />
              </div>
              <button>Search</button>
            </form>
          </div>

          <Grid
            container
            spacing={5}
            justify="center"
            className={classes.gridContainer}
          >
            {results
              .slice((currentPage - 1) * pageSize, currentPage * pageSize)
              .map((card) =>
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
              itemsCount={results.length}
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
