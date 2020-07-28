<<<<<<< HEAD
import React from "react";
=======

import React, { useState, useEffect } from "react";
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
import _ from "lodash";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "../hooks/useTranslation";
import WithLocaleWrapper from "../hocs/withLocale";

<<<<<<< HEAD
const AdvancedSearch = (props) => {
  let [services, setServices] = useState([]);
  let [coaches, setCoaches] = useState([]);
  let [sport, setSport] = useState([]);
  let [language, setLanguage] = useState([]);
  let [locations, setlocations] = useState([]);
  let [minPrice, setMinPrice] = useState([]);
  let [maxPrice, setMaxPrice] = useState([]);
  let [result, setresult] = useState([]);
  let [error, setError] = useState([]);

  useEffect(() => {
    setServices(props.services);
    setCoaches(props.coaches);
  }, []);

  const router = useRouter();
  const { locale, t } = useTranslation();


  const handleChangeSport = (e) => {
=======
let AdvancedSearch = (props) => {

  let [services, setServices] = useState(props.services)
  let [coaches, setCoaches] = useState(props.coaches)
  let [sport, setSport] = useState([])
  let [language, setLanguage] = useState([])
  let [location, setLocation] = useState([])
  let [minPrice, setMinPrice] = useState([])
  let [maxPrice, setMaxPrice] = useState([])
  let [result, setResult] = useState([])
  let [error, setError] = useState([])




  let handleChangeSport = (e) => {
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
    e.preventDefault();
    const sport = [];
    const sportError = [];
    services.map((i, index) => {
      if (i.title.toLowerCase() === e.target.value.toLowerCase()) {
        sport.push(i);
      } else if (i.title.toLowerCase() !== e.target.value.toLowerCase()) {
        sportError.push(` ${e.target.value} is not supported Sport`);
      }
    });
    setSport(sport);
<<<<<<< HEAD
    error.push(sportError[0]);
  };

  const handleChangeLanguage = (e) => {
=======
    setError([...error, sportError[0]])

    console.log('sport', sport)
  };

  let handleChangeLanguage = (e) => {
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
    e.preventDefault();
    // this is result for match coach sport title and langugage supported
    const language = [];
    coaches.map((i) => {
<<<<<<< HEAD
      if (i.lang.slice(0, 2) === e.target.value) {
=======
      if (e.target.value === 'All Languages')
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
        language.push(i._id);
      else
        if (i.lang.slice(0, 2) === e.target.value) {
          language.push(i._id);
        }
    });
    setLanguage(language);
<<<<<<< HEAD
  };

  const handleChangeLocations = (e) => {
    e.preventDefault();
    const locations = [];
    const locationsError = [];
    services.map((i) => {
      if (i.locations.toLowerCase() === e.target.value.toLowerCase()) {
        locations.pop();
        locations.push(e.target.value.toLowerCase());
      } else if (i.locations.toLowerCase() !== e.target.value.toLowerCase()) {
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
=======

    console.log('language', language)
  };

  let handleChangeLocation = (e) => {
    e.preventDefault();
    const location = [];
    const locationError = [];
    services.map((i) => {
      if (i.location.toLowerCase() === e.target.value.toLowerCase()) {
        location.pop();
        location.push(e.target.value.toLowerCase());
      } else if (i.location.toLowerCase() !== e.target.value.toLowerCase()) {
        locationError.pop();
        locationError.push(` ${e.target.value} is not supported location`);
      }
    });
    setLocation(location);
    setError([...error, locationError[0]])

    console.log('location', location)
  };

  let handleChangePriceMin = (e) => {
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
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
    }
    setMinPrice(minPrice);
<<<<<<< HEAD
    error.push(minError[0]);
  };

  const handleChangePriceMax = (e) => {
=======
    setError([...error, minError[0]])

    console.log('minP', minPrice)

  };

  let handleChangePriceMax = (e) => {
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
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
    }
    setMaxPrice(maxPrice);
<<<<<<< HEAD
    error.push(maxError[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // this is result of sport and language and locations
    const result = [];

=======
    setError([...error, maxError[0]])

    console.log('maxP', maxPrice)
  };

  useEffect(() => {
    const results = [];
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
    sport.map((service) =>
      language.map((lang) =>
        locations.map((loc) => {
          if (service.locations.toLowerCase() === loc) {
            if (service.owner === lang) {
<<<<<<< HEAD
              result.push(service);
              setresult(result);
            } else {
              return null;
=======
              results.push(service);
              setResult(results);
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
            }
          }
        })
      )
    );
<<<<<<< HEAD
    if (result.length === 0) {
=======

    if (results.length === 0) {
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
      if (language.length === 0) {
        if (locations.length === 0) {
          const values = sport.values();
          for (const value of values) {
<<<<<<< HEAD
            result.push(value);
            setresult(result);
=======
            results.push(value);
            setResult(results);
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
          }
        } else if (locations.length !== 0) {
          sport.map((i) =>
<<<<<<< HEAD
            locations.map((l) => {
              if (i.locations.toLowerCase() === l) {
                result.push(i);
                setresult(result);
              } else {
                return null;
=======
            location.map((l) => {
              if (i.location.toLowerCase() === l) {
                results.push(i);
                setResult(results);
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
              }
            })
          );
        }
      } else if (language.length !== 0) {
        sport.map((i) =>
          language.map((l) => {
            if (i.owner === l) {
<<<<<<< HEAD
              result.push(i);
              setresult(result);
            } else {
              return null;
=======
              results.push(i);
              setResult(results);
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
            }
          })
        );
      }
    }
<<<<<<< HEAD
    const priceresult = [];
    if (result.length !== 0) {
=======


    const priceResult = [];
    if (results.length !== 0) {
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
      if (minPrice.length !== 0 && maxPrice.length !== 0) {
        result.map((i) => {
          if (_.inRange(i.price, minPrice, maxPrice)) {
<<<<<<< HEAD
            priceresult.push(i);
            setresult(priceresult);
=======
            priceResult.push(i);
            setResult(priceResult);
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
          } else {
            return null;
          }
        });
      }
    }
<<<<<<< HEAD
    
  };
  console.log("Child Side props.result", props.result,'result',result);
  return (
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
          <input onChange={handleChangeLocations} placeholder="locations" />
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

=======

    console.log('resutl effect', result)

  }, [sport, language, location, minPrice, maxPrice])

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log('clicked', result)
    props.setResults([...result])
    // this is result of sport and language and location
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around', paddingTop: '8vh' }}>
        <div className="sport">
          <input onChange={handleChangeSport} placeholder="Sport" className='form-control' defaultValue={props.initialProps[0]} />
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
        <div className="location">
          <input
            onChange={handleChangeLocation}
            placeholder="Location"
            className='form-control'
            defaultValue={props.initialProps[1]}
          />
          {/*Languages   */}
          {/* brussels */}
          {/*  Leuven  */}
          {/*   Paris  */}
        </div>
        <div className="language">
          <select onChange={handleChangeLanguage} style={{
            border: '4px', borderColor: 'black', borderRadius: '5px', width: '150px', height: '40px', textAlign: 'left', textAlignLast: 'left', backgroundColor: 'white', paddingLeft: '5px'
          }}>
            <option defaultValue>All Languages</option>
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>

          {/*Languages  */}
          {/* Dutch  */}
          {/* French */}
          {/* English*/}
        </div>
        <div className="priceMin">
          <input
            onChange={handleChangePriceMin}
            placeholder="Min Price"
            type="number"
            className='form-control'
            style={{ width: '150px' }}
          />
        </div>

>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5
        <div className="priceMax">
          <input
            onChange={handleChangePriceMax}
            placeholder="Max Price"
            type="number"
<<<<<<< HEAD
          />
        </div>
        <button>Search</button>
      </form>
    </div>
  );
};
=======
            className='form-control'
            style={{ width: '150px' }}
          />
        </div>
        <button style={{
          border: '0', borderRadius: '20px', width: '100px', height: '40px', textAlign: 'center', textAlignLast: 'center', color: 'white', backgroundColor: 'rgb(65,161,242)'
        }}>Search</button>
      </form>
    </div>
  );
}
>>>>>>> e9c0a9551af2534596718ac34828c0e3702961b5

export default AdvancedSearch;