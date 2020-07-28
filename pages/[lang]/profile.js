import React, { Component } from "react";
import Layout from "../../components/Layout";
import WithLocaleWrapper from "../../hocs/withLocale";
import fetch from "isomorphic-unfetch";
import CoachProfile from '../../components/CoachPageDesign'

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

const coachServices = [];

class Profile extends Component {
  state = {
    services: [],
    coachServices: [],
  };

  componentDidMount() {
    fetch(`${urlEndpoint}searches`)
      .then((response) => response.json())
      .then((data) => this.setState({ services: data }))
      .then(() => {
        this.state.services.filter((i, e) => {
          if (this.props.props.owner === i.owner) {
            coachServices.push(i);
            return this.setState({ coachServices: i });
          } else {
            return null;
          }
        });
      });
  }

  handleClick = (e) => {
    console.log("clicked");
  };
  render() {
    const { props } = this.props;
    console.log(props)
    return (
      <div>
        <Layout>
          <CoachProfile name={props.firstName + ' ' + props.lastName}
            title={props.title}
            location={props.location}
            language={props.lang.toUpperCase()}
            price={props.price}
            description={props.description}
            coachServices={coachServices}
          />
        </Layout>
      </div>
    );
  }
}

Profile.getInitialProps = async ({ query }) => {
  return {
    props: query,
  };
};

export default WithLocaleWrapper(Profile);
