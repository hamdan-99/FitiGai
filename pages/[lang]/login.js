import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import Layout from "../../components/Layout";
import WithLocaleWrapper from "../../hocs/withLocale";
import useTranslation from "../../hooks/useTranslation";

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

const Login = (props) => {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    const body = { email, password };

    fetch(`${urlEndpoint}auth/login-local`, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.token) {
          //set cookie
          cookie.set("token", res.token, { expires: 2 });
          localStorage.setItem("token", res.token);
          // props.setToken(res.token)
          Router.push("/");
        }
      });
  }
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <p>{t("Login")}</p>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value={t("Submit")} />
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </form>
    </Layout>
  );
};

export default WithLocaleWrapper(Login);
