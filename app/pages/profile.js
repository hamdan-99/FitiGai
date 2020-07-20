import Layout from "../components/Layout";
import Header from "../components/Header";
import Features from "../components/Features";
import AboutMe from "../components/AboutMe";
import profile from "./data.js";
import { useState, useEffect } from "react";

// import Calendar from '../components/Calendar';

const Profile = (props) => {
 
  return (
    <Layout>
      <div>
        <Header />
        <div className="row mx-auto mt-5" style={{ maxWidth: 1000 }}>
          <Features />
          <AboutMe />
          <div className="col-md-4 p-5 ">
            <button type="button" className="btn btn-primary mb-2">
              Click below and see coach's availability
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

Profile.getInitialProps = async ({ query }) => {
  console.log("ZSDERGTERTGER", query);
  return {
    props: query,
  };
};

export default Profile;
