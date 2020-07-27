import React, { Component } from "react";

class AdvancedSearch extends Component {
  state = {
    services: [],
    coaches: [],
    sport: [],
  };
  componentDidMount() {
    this.setState({ services: this.props.services });
    this.setState({ coaches: this.props.coaches });
  }
  handleChangeSport = (e) => {
    e.preventDefault();

    this.state.services.map((i, index) => {
      if (i.title.toLowerCase() === e.target.value.toLowerCase()) {
        console.log("checked", index, i);
      }
    });

    console.log(e.target.value);
  };

  handleChangeLanguage = (e) => {
    e.preventDefault();
    this.state.coaches.map((i, index) => {
      if (i.lang.slice(0, 2) === e.target.value.toLowerCase()) {
        console.log("checked", index, i);
      }
    });
    console.log(e.target.value);
  };

  handleChangeLocation = (e) => {
    e.preventDefault();
    this.state.services.map((i, index) => {
      if (i.location.toLowerCase() === e.target.value.toLowerCase()) {
        console.log("checked", index, i);
      }
    });
    console.log(e.target.value);
  };

  handleChangePrice = (e) => {
    e.preventDefault();
    const lessPrice = [];

    this.state.services.map((i, index) => {
      if (e.target.value <= i.price) {
        if (e.target.value == i.price) {
          lessPrice.pop();
          lessPrice.push(i.price);
        } else {
          
         const min = Math.min(i.price);
         const max = Math.max(i.price);
        //  lessPrice.push(min);
         lessPrice.pop();
         lessPrice.push(max);
          // lessPrice.push(`there is no less price than ${e.target.value}`);
        }
      } else {
        return null;
      }
    });
    console.log("e", e.target.value, "lessPrice", lessPrice ,'min');
  };

  render() {
    console.log("state", this.state.services, "coaches", this.state.coaches);

    return (
      <div>
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
          <input onChange={this.handleChangeLanguage} placeholder="language" />
          {/*Languages  */}
          {/* Dutch  */}
          {/* French */}
          {/* English*/}
        </div>

        <div className="location">
          <input onChange={this.handleChangeLocation} placeholder="location" />
          {/*Languages   */}
          {/* brussels */}
          {/*  Leuven  */}
          {/*   Paris  */}
        </div>

        <div className="price">
          <input
            onChange={this.handleChangePrice}
            placeholder="price"
            type="number"
          />
      
        </div>
      </div>
    );
  }
}

export default AdvancedSearch;
