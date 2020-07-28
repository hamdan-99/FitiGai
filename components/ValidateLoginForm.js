import React from "react";
import Link from 'next/link';
import { Formik } from "formik";
import { validateEmail } from '../utils/validation'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Router from "next/router";
import cookie from "js-cookie";
import fetch from "node-fetch";

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

const ValidatedLoginForm = ({ t, locale }) => (
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
          })
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
        <div className='login-form'>
          <h1>{t('Login')}</h1>
          <form onSubmit={handleSubmit} >
            <TextField
              borderRadius="50%"
              label={t('Email')}
              id="outlined-required"
              className='input-box'
              name="email"
              type="text"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.email && touched.email ? t(errors.email) : null}
              error={errors.email && touched.email}
            />
            <hr />
            <TextField
              label={t("Password")}
              id="outlined-required"
              className='input-box'
              name="password"
              type="password"
              variant="outlined"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.password && touched.password ? t(errors.password) : null}
              error={errors.password && touched.password}
            />
            <hr />
            <button variant="contained" className='login-btn' value={"Login"} type="submit" disabled={isSubmitting} >{t("Login")}</button>
            <hr />
            <p>
              {t('DontHaveAccount')}
              <Link href='/[lang]/signup' as={`/${locale}/signup`}>
                <a className='login-link'>
                  {t('Signup')}
                </a>
              </Link>
            </p>
          </form>
          <style jsx>
            {`
            .login-form {
              width: 350px;
              border-radius: 20px;
              box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
              background: #fff;
              padding: 20px;
              margin: 50px auto;
              text-align: center;
            }
            .login-form h1 {
              color: #1c8adb;
              margin-bottom: 30px;
            }
            .input-box {
              border-radius: 20px;
              padding: 10px;
              margin: 2px 0;
              width: 100%;
              border: 1px solid #999;
              outline: none;
            }
            .login-btn {
              background-color: #1c8adb;
              color: #fff;
              width: 100%;
              padding: 10px;
              border-radius: 20px;
              border: none;
              outline: none;
              cursor: pointer;
            }
            .login-btn:hover {
              opacity: 0.9;
            }
            .login-link {
              text-decoration: none;
              margin-left: 2px;
            }
            hr {
              margin-top: 20px;
              width: 80%;
            }
          `}
          </style>
        </div>
      );
    }}
  </Formik >
)


export default ValidatedLoginForm;
