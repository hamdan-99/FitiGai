import React, { useState } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Features from "../../components/Features";
import AboutMe from "../../components/AboutMe";
import profile from "../data.js";
import { useState, useEffect } from "react";
import WithLocaleWrapper from '../../hocs/withLocale'
import useTranslation from '../../hooks/useTranslation'

const Profile = (props) => {
  const { t } = useTranslation()

  return (
    <Layout>
      <div>
        <Header />
        <div className="row mx-auto mt-5" style={{ maxWidth: 1000 }}>
          <Features />
          <AboutMe />
          <div className="col-md-4 p-5 ">
            <button type="button" className="btn btn-primary mb-2">
              {t("Click below and see coach's availability")}
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

export default WithLocaleWrapper(Profile);
