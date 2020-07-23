import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import Layout from "../../components/Layout";
import WithLocaleWrapper from "../../hocs/withLocale";
import useTranslation from "../../hooks/useTranslation";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { validateEmail, validatePassword } from '../../utils/validation'

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
      <form style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '60%', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <p>{t('Login')}</p>
        <TextField
          required
          label={t('Email')}
          id="outlined-required"
          name="email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          label={t("Password")}
          // 
          id="outlined-required"
          name="password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={(password === '' || validatePassword(password)) ? "" : 'At least 6 characters'}
        />
        <Button variant="contained" value={"Login"} disabled={!(validateEmail(email) && validatePassword(password))} onClick={(e) => handleSubmit(e)} >{t("Login")}</Button>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </form>
    </Layout>
  );
};

export default WithLocaleWrapper(Login);
