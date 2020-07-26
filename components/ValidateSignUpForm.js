import React from "react";
import { Formik } from "formik";
import { validateEmail } from '../utils/validation'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Router from "next/router";
import cookie from "js-cookie";
import fetch from "node-fetch";

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

const ValidatedSignUpForm = ({ t }) => (
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
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <TextField
              label={t('FirstName')}
              id="outlined-required"
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
              name="lastName"
              type="text"
              variant="outlined"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={errors.lastName && touched.lastName ? errors.lastName : null}
              error={errors.lastName && touched.lastName}
            />
          </div>
          <TextField
            label={t('Phone')}
            id="outlined-required"
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
          <Button variant="contained" value={"Signup"} type="submit" disabled={isSubmitting} >{t("Signup")}</Button>
        </form>
      );
    }}
  </Formik>
)


export default ValidatedSignUpForm;
