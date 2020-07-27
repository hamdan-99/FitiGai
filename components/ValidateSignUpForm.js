import React from "react";
import { Formik } from "formik";
import Link from 'next/link';
import { validateEmail } from '../utils/validation'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Router from "next/router";
import cookie from "js-cookie";
import fetch from "node-fetch";

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;


const ValidatedSignUpForm = ({ t, locale }) => (
  <Formik
    initialValues={{ email: "", password: "", firstName: "", lastName: "", phone: "" }}
    onSubmit={(body, { setSubmitting }) => {
      setTimeout(async () => {
        console.log("Logging in", body);
        setSubmitting(false);

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

      }, 500);
    }}
    //********Handling validation messages yourself*******/
    validate={values => {
      let errors = {};

      if (!values.firstName) {
        errors.firstName = "Required";
      }

      if (!values.lastName) {
        errors.lastName = "Required";
      }

      const phoneRegex = /^\d+$/;
      if (!values.phone) {
        errors.phone = "Required";
      } else if (!phoneRegex.test(values.phone)) {
        errors.phone = "Invalid phone number";
      }


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
        <div className='sign-up-form'>
          <h1>{t('Signup')}</h1>
          <form onSubmit={handleSubmit} >
            <TextField
              label={t('FirstName')}
              id="outlined-required"
              className='input-box'
              name="firstName"
              type="text"
              variant="outlined"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.firstName && touched.firstName ? errors.firstName : null}
              error={errors.firstName && touched.firstName}
            />
            <TextField
              label={t('LastName')}
              id="outlined-required"
              className='input-box'
              name="lastName"
              type="text"
              variant="outlined"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.lastName && touched.lastName ? errors.lastName : null}
              error={errors.lastName && touched.lastName}
            />

            <TextField
              label={t('Phone')}
              id="outlined-required"
              className='input-box'
              name="phone"
              type="text"
              variant="outlined"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.phone && touched.phone ? errors.phone : null}
              error={errors.phone && touched.phone}
            />
            <TextField
              label={t('Email')}
              id="outlined-required"
              className='input-box'
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
              className='input-box'
              name="password"
              type="password"
              variant="outlined"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.password && touched.password ? errors.password : null}
              error={errors.password && touched.password}
            />
            <p>
              <span className='terms'>
                <input type='checkbox' />
              </span>
              {t('AgreeTermsAndServices')}
            </p>
            <Button variant="contained" value={"Signup"} type="submit" disabled={isSubmitting} >{t("Signup")}</Button>
            <hr />
            <p>
              {t('AlreadyHaveAccount')}
              <Link href='/[lang]/login' as={`/${locale}/login`}>
                <a className='login-link'>
                  {t('Login')}
                </a>
              </Link>
            </p>
          </form>
          <style jsx>
            {`
            .sign-up-form {
              width: 350px;
              border-radius: 20px;
              box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);
              background: #fff;
              padding: 20px;
              margin: 50px auto;

              text-align: center;
            }
            .sign-up-form h1 {
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
            .signup-btn {
              background-color: #1c8adb;
              color: #fff;
              width: 100%;
              padding: 10px;
              border-radius: 20px;
              margin: 10px 0;
              border: none;
              outline: none;
              cursor: pointer;
            }
            .signup-btn:hover {
              opacity: 0.9;
            }
            .login-link {
              text-decoration: none;
              margin-left: 2px;
            }
            .terms {
              margin-right: 2px;
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
  </Formik>
)


export default ValidatedSignUpForm;
