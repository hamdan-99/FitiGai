import React from 'react'
import Layout from "../../components/Layout";
import Search from "../../components/Search";
import WithLocaleWrapper from '../../hocs/withLocale'
import fetch from "node-fetch";


function Home() {


  return (
    <Layout>
      <Search />
    </Layout>
  );
}



export default WithLocaleWrapper(Home);
