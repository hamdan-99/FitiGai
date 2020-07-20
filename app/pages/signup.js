import React, { useState } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import Layout from "../components/Layout";
const Signup = () => {
  const [signupError, setSignupError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const body = { email, password, firstName, lastName, phone };
    const response = await fetch(
      "http://localhost:5555/v1/auth/register-local",
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
        <p>Sign Up</p>
        <label htmlFor="email">
          email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
          />
        </label>

        <label htmlFor="password">
          password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
          />
        </label>

        <label htmlFor="firstName">
          firstName
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            type="firstName"
          />
        </label>

        <label htmlFor="lastName">
          lastName
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            type="lastName"
          />
        </label>

        <label htmlFor="phone">
          phone
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            type="phone"
          />
        </label>

        <button type="submit">Sign up</button>
        {signupError && <p style={{ color: "red" }}>{signupError}</p>}
      </form>
    </Layout>
  );
};

export default Signup;
