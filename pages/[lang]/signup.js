import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import Layout from "../../components/Layout";
import WithLocaleWrapper from "../../hocs/withLocale";
import useTranslation from "../../hooks/useTranslation";
import fetch from "node-fetch";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { validateEmail, validatePassword } from '../../utils/validation'

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

const Signup = () => {
  const [signupError, setSignupError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { t } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();

    const body = { email, password, firstName, lastName, phone };
    const response = await fetch(`${urlEndpoint}auth/register-local`, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const cookieToken = cookie.get("token");
      cookie.set("token", cookieToken, { expires: 2 });
      Router.push("/");
    }

  }
  return (
    <Layout>
      <form style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <p>{t('Signup')}</p>
        <TextField
          required
          label={t('FirstName')}
          id="outlined-required"
          name="firstName"
          type="firstName"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          required
          label={t('LastName')}
          id="outlined-required"
          name="lastName"
          type="lastName"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          required
          label={t('Email')}
          id="outlined-required"
          name="email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={(email === '' || validateEmail(email)) ? "" : 'Email is Invalid'}
        />
        <TextField
          required
          label={t('Phone')}
          id="outlined-number"
          name="phone"
          type="phone"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^\d]/, ''))}
        />
        <TextField
          required
          label={t("Password")}
          id="outlined-required"
          name="password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={(password === '' || validatePassword(password)) ? "" : 'At least 6 characters'}

        />
        <Button variant="contained" value={"Signup"} disabled={!(validateEmail(email) && validatePassword(password) && firstName !== '' && lastName !== '' && phone !== '')} onClick={(e) => handleSubmit(e)} >{t("Signup")}</Button>
        {signupError && <p style={{ color: "red" }}>{signupError}</p>}
      </form>
    </Layout >
  );
};

export default WithLocaleWrapper(Signup);
