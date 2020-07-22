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
    if (!validateEmail(email))
      console.log('Email is Invalid')
    else if (!validatePassword(password))
      console.log('Password is Invalid, must be at least 6 characters')
    else if (firstName == '' | lastName == '')
      console.log('Name-LastName Missing')
    {
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
  }
  return (
    <Layout>
      <form style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <p>{t('Signup')}</p>
        <TextField
          id="outlined-required"
          name="firstName"
          type="firstName"
          variant="outlined"
          placeholder={t('FirstName')}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          id="outlined-required"
          name="lastName"
          type="lastName"
          variant="outlined"
          placeholder={t('LastName')}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          id="outlined-required"
          name="email"
          type="email"
          variant="outlined"
          placeholder={t('Email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-number"
          name="phone"
          type="phone"
          variant="outlined"
          placeholder={t('Phone')}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^\d]/, ''))}
        />
        <TextField
          id="outlined-required"
          name="password"
          type="password"
          variant="outlined"
          placeholder={t("Password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" value={"Signup"} onClick={(e) => handleSubmit(e)} >{t("Signup")}</Button>
        {signupError && <p style={{ color: "red" }}>{signupError}</p>}
      </form>
    </Layout >
  );
};

export default WithLocaleWrapper(Signup);
