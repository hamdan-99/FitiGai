import React from "react";
import { Formik } from "formik";
import { validateEmail } from '../utils/validation'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Router from "next/router";
import cookie from "js-cookie";
import fetch from "node-fetch";

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

const ValidatedLoginForm = ({ t }) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(body, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", body);
        setSubmitting(false);

        fetch(`${urlEndpoint}auth/login-local`, {
          method: "post",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res && res.token) {
              cookie.set("token", res.token, { expires: 2 });
              localStorage.setItem("token", res.token);
              Router.push("/");
            }
          });
      }, 500);
    }}
    //********Handling validation messages yourself*******/
    validate={values => {
      let errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!validateEmail(values.email)) {
        errors.email = "Invalid email address";
      }

      const passwordRegex = /(?=.*[0-9])/;
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be 8 characters long.";
      } else if (!passwordRegex.test(values.password)) {
        errors.password = "Invalida password. Must contain one number";
      }

      return errors;
    }}

  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <TextField
            label={t('Email')}
            id="outlined-required"
            name="email"
            type="text"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.email && touched.email ? errors.email : null}
            error={errors.email && touched.email}
          />
          <TextField
            label={t("Password")}
            id="outlined-required"
            name="password"
            type="password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.password && touched.password ? errors.password : null}
            error={errors.password && touched.password}
          />
          <Button variant="contained" value={"Login"} type="submit" disabled={isSubmitting} >{t("Login")}</Button>
        </form>
      );
    }}
  </Formik>
)


export default ValidatedLoginForm;
