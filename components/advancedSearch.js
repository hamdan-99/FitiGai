import React, { Component } from "react";
import _ from "lodash";

class AdvancedSearch extends Component {
  state = {
    services: [],
    coaches: [],
    sport: [],
    language: [],
    location: [],
    minPrice: [],
    maxPrice: [],
    result: [],
    error: [],
  };
  componentDidMount() {
    this.setState({ services: this.props.services });
    this.setState({ coaches: this.props.coaches });
  }
  componentDidUpdate(prevState) {
    if (this.state.result !== 0) {
      if (prevState.result !== this.state.result) {
        this.props.result.as = [...this.state.result];
      }else{
        return null;
      }
      console.log(
        "parent",
        this.props.result,
        "result",
        this.state.result,
        "result",
        this.state.sport
      );
    } else {
      return null;
    }
  }

  handleChangeSport = (e) => {
    e.preventDefault();
    const sport = [];
    const sportError = [];
    this.state.services.map((i, index) => {
      if (i.title.toLowerCase() === e.target.value.toLowerCase()) {
        sport.push(i);
      } else if (i.title.toLowerCase() !== e.target.value.toLowerCase()) {
        sportError.push(` ${e.target.value} is not supported Sport`);
      } else {
        return null;
      }
    });
    this.setState({ sport: sport });
    this.state.error.push(sportError[0]);
  };

  handleChangeLanguage = (e) => {
    e.preventDefault();
    // this is result for match coach sport title and langugage supported
    const language = [];
    this.state.coaches.map((i) => {
      if (i.lang.slice(0, 2) === e.target.value) {
        language.push(i._id);
      } else {
        return null;
      }
    });
    this.setState({ language: language });
  };

  handleChangeLocation = (e) => {
    e.preventDefault();
    const location = [];
    const locationError = [];
    this.state.services.map((i) => {
      if (i.location.toLowerCase() === e.target.value.toLowerCase()) {
        location.pop();
        location.push(e.target.value.toLowerCase());
      } else if (i.location.toLowerCase() !== e.target.value.toLowerCase()) {
        locationError.pop();
        locationError.push(` ${e.target.value} is not supported location`);
      } else {
        return null;
      }
    });
    this.setState({ location: location });
    this.state.error.push(locationError[0]);
  };

  handleChangePriceMin = (e) => {
    e.preventDefault();
    const minPrice = [];
    const minError = [];
    const number = this.state.services.map((i) => i.price);
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
    this.setState({ minPrice: minPrice });
    this.state.error.push(minError[0]);
  };

  handleChangePriceMax = (e) => {
    e.preventDefault();
    const maxPrice = [];
    const maxError = [];
    const number = this.state.services.map((i) => i.price);
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
    this.setState({ maxPrice: maxPrice });
    this.state.error.push(maxError[0]);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // this is result of sport and language and location
    const results = [];

    const { sport, language, location, maxPrice, minPrice, error } = this.state;
    sport.map((service) =>
      language.map((lang) =>
        location.map((loc) => {
          if (service.location.toLowerCase() === loc) {
            if (service.owner === lang) {
              results.push(service);
              this.setState({ result: results });
            } else {
              return null;
            }
          } else {
            return null;
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
            this.setState({ result: results });
          }
        } else if (location.length !== 0) {
          sport.map((i) =>
            location.map((l) => {
              if (i.location.toLowerCase() === l) {
                results.push(i);
                this.setState({ result: results });
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
              results.push(i);
              this.setState({ result: results });
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
    const priceResult = [];
    if (results.length !== 0) {
      if (minPrice.length !== 0 && maxPrice.length !== 0) {
        results.map((i) => {
          if (_.inRange(i.price, minPrice, maxPrice)) {
            priceResult.push(i);
            this.setState({ result: priceResult });
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
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="sport">
            <input onChange={this.handleChangeSport} placeholder="Sport" />
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
            <select onChange={this.handleChangeLanguage}>
              <option defaultValue>Choose Language</option>
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>

            {/*Languages  */}
            {/* Dutch  */}
            {/* French */}
            {/* English*/}
          </div>

          <div className="location">
            <input
              onChange={this.handleChangeLocation}
              placeholder="location"
            />
            {/*Languages   */}
            {/* brussels */}
            {/*  Leuven  */}
            {/*   Paris  */}
          </div>

          <div className="priceMin">
            <input
              onChange={this.handleChangePriceMin}
              placeholder="Min Price"
              type="number"
            />
          </div>

          <div className="priceMax">
            <input
              onChange={this.handleChangePriceMax}
              placeholder="Max Price"
              type="number"
            />
          </div>
          <button>Search</button>
        </form>
      </div>
    );
  }
}

export default AdvancedSearch;
