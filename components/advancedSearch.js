
import React, { useState, useEffect } from "react";
import _ from "lodash";

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
    setError([...error, sportError[0]])

    console.log('sport', sport)
  };

  let handleChangeLanguage = (e) => {
    e.preventDefault();
    // this is result for match coach sport title and langugage supported
    const language = [];
    coaches.map((i) => {
      if (e.target.value === 'All Languages')
        language.push(i._id);
      else
        if (i.lang.slice(0, 2) === e.target.value) {
          language.push(i._id);
        }
    });
    setLanguage(language);

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
    setError([...error, minError[0]])

    console.log('minP', minPrice)

  };

  let handleChangePriceMax = (e) => {
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
    setError([...error, maxError[0]])

    console.log('maxP', maxPrice)
  };

  useEffect(() => {
    const results = [];
    sport.map((service) =>
      language.map((lang) =>
        location.map((loc) => {
          if (service.location.toLowerCase() === loc) {
            if (service.owner === lang) {
              results.push(service);
              setResult(results);
            }
          }
        })
      )
    );

    if (results.length === 0) {
      if (language.length === 0) {
        if (location.length === 0) {
          const values = sport.values();
          for (const value of values) {
            results.push(value);
            setResult(results);
          }
        } else if (location.length !== 0) {
          sport.map((i) =>
            location.map((l) => {
              if (i.location.toLowerCase() === l) {
                results.push(i);
                setResult(results);
              }
            })
          );
        }
      } else if (language.length !== 0) {
        sport.map((i) =>
          language.map((l) => {
            if (i.owner === l) {
              results.push(i);
              setResult(results);
            }
          })
        );
      }
    }


    const priceResult = [];
    if (results.length !== 0) {
      if (minPrice.length !== 0 && maxPrice.length !== 0) {
        results.map((i) => {
          if (_.inRange(i.price, minPrice, maxPrice)) {
            priceResult.push(i);
            setResult(priceResult);
          } else {
            return null;
          }
        });
      }
    }

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

        <div className="priceMax">
          <input
            onChange={handleChangePriceMax}
            placeholder="Max Price"
            type="number"
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

export default AdvancedSearch;