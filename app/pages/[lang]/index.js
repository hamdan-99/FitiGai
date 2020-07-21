import React from 'react'
import Layout from "../../components/Layout";
import Search from "../../components/Search";
import WithLocaleWrapper from '../../hocs/withLocale'

// import cookie from "js-cookie";
// import Router from "next/router";
// import { useRouter } from "next/router";

function Home(props) {


  // const router = useRouter();

  // const token = [];
  // const cookieToken = cookie.get("token");
  // if (cookieToken) {
  //   token.push(cookieToken);
  // }
  // if (cookieToken) {
  //   cookie.remove("token");
  //   Router.push("/");
  // }
  // if (!cookieToken) {
  //   cookie.remove()
  //   cookie.set("token", token[0], { expires: 2 });

  // //  await [localStorage.setItem("token", token[0])];
  // }

  // console.log('Router',router.pathname)
  return (
    <Layout>
      <Search data={props} />
    </Layout>
  );
}

// export async function getServerSideProps() {
//   const res = await fetch("http://localhost:5555/v1/service");
//   const services = await res.json();
//   return {
//     props: { services },
//   };
// }

export default WithLocaleWrapper(Home);
