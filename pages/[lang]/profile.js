import React, { Component } from "react";
import Layout from "../../components/Layout";
import WithLocaleWrapper from "../../hocs/withLocale";
import fetch from "isomorphic-unfetch";
import useTranslation from "../../hooks/useTranslation";

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
    return (
      <div>
        <Layout>
          <div>
            <div className="Container">
              <div className="leftSide">
                <img
                  src="https://cdn.glitch.com/323a5f71-5800-4689-9792-0fed771775d5%2Fdefault-user.png?v=1587762169218"
                  alt="My name"
                  id="pics"
                />
                <h5 id="coach">{`${props.title}`} Coach</h5>
                <div className="infoLeftSide">
                  <h5>
                    <i
                      id="leftIcon"
                      className="fa fa-user"
                      aria-hidden="true"
                    ></i>
                    <span className="leftInfo">{`${props.firstName} ${props.lastName}`}</span>
                  </h5>
                  <h5>
                    <i
                      id="leftIcon"
                      className="fa fa-map-marker"
                      aria-hidden="true"
                    ></i>
                    <span className="leftInfo">{`${props.location}`}</span>
                  </h5>
                  <h5>
                    <i
                      id="leftIcon"
                      className="fa fa-language"
                      aria-hidden="true"
                    ></i>
                    <span className="leftInfo">{`${props.lang.toUpperCase()}`}</span>
                  </h5>
                  <h5>
                    <i
                      id="leftIcon"
                      className="fa fa-money"
                      aria-hidden="true"
                    ></i>
                    <span className="leftInfo">{`${props.price}/H`}</span>
                  </h5>
                </div>
              </div>

              <div className="middle">
                <div className="up">
                  <h5>
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                    <br />
                    {`${props.description}`}
                  </h5>
                </div>

                <div className="down">
                  <button onClick={this.handleClick}>Contact Me</button>
                </div>
              </div>
              <div className="rightSide">
                <h5>{`${props.firstName} ${props.lastName}`} Services</h5>
                {(coachServices.length > 0 && (
                  <ul>
                    {coachServices.map((i) => (
                      <li key={i.title}>{i.title}</li>
                    ))}
                  </ul>
                )) ||
                  props.title}
              </div>
            </div>
          </div>

          <style jsx>
            {`
              .Container {
                position: fixed;
                padding: 20px;
                margin: 0px;
                top: 120px;
              }
              .leftSide {
                position: fixed;
                background-color: rgba(148, 225, 245, 0.61);
                width: 300px;
                height: 450px;
                padding: 20px;
                border-radius: 20px;
                text-align: left;
                left: 100px;
              }
              #coach {
                position: relative;
                top: 195px;
                text-align: center;
              }
              #pics {
                position: absolute;
                top: 10px;
                left: 55px;
                height: 200px;
                width: 200px;
              }
              .infoLeftSide {
                position: relative;
                top: 210px;
                left: 50px;
              }

              .up {
                position: fixed;
                left: 480px;
                width: 400px;
                height: 200px;
                padding: 20px;
                border-radius: 20px;
                background-color: rgba(148, 225, 245, 0.61);
              }
              .down {
                position: fixed;
                left: 480px;
                top: 380px;
                width: 400px;
                height: 200px;
                padding: 20px;
                border-radius: 20px;
                background-color: rgba(148, 225, 245, 0.61);
              }

              .leftInfo {
                position: relative;
                left: 10px;
                text-align: left;
              }
              #leftIcon {
                position: relative;
                left: -30px;
                text-align: left;
              }
              .rightSide {
                position: fixed;
                left: 960px;
                background-color: rgba(148, 225, 245, 0.61);
                width: 300px;
                height: 450px;
                padding: 20px;
                border-radius: 20px;
                text-align: left;
              }
            `}
          </style>
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
