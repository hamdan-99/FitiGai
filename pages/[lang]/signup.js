import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import Layout from "../../components/Layout";
import WithLocaleWrapper from '../../hocs/withLocale'
import useTranslation from '../../hooks/useTranslation'
import fetch from "node-fetch";

const Signup = () => {
  const [signupError, setSignupError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { t } = useTranslation()

  async function handleSubmit(e) {
    e.preventDefault();
    const body = { email, password, firstName, lastName, phone };
    const response = await fetch(
      "https://fitigai-api.herokuapp.com:5555/v1/user",
      {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const cookieToken = cookie.get("token");
      cookie.set("token", cookieToken, { expires: 2 });
      Router.push("/");
    }
  }
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <p>{t('Signup')}</p>
        <label htmlFor="email">
          {t('Email')}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder='email'
          />
        </label>

        <label htmlFor="password">
          {t('Password')}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder='password'

          />
        </label>

        <label htmlFor="firstName">
          {t('FirstName')}
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            type="firstName"
            placeholder='firstName'

          />
        </label>

        <label htmlFor="lastName">
          {t('LastName')}
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            type="lastName"
            placeholder='lastName'

          />
        </label>

        <label htmlFor="phone">
          {t('Phone')}
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            type="phone"
            placeholder='phone'

          />
        </label>

        <button type="submit">{t('Signup')}</button>
        {signupError && <p style={{ color: "red" }}>{signupError}</p>}
      </form>
    </Layout>
  );
};

export default WithLocaleWrapper(Signup);
