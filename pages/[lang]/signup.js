import React, { useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import Layout from '../../components/Layout';
import WithLocaleWrapper from '../../hocs/withLocale';
import useTranslation from '../../hooks/useTranslation';
import fetch from 'node-fetch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { validateEmail, validatePassword } from '../../utils/validation';

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

const Signup = () => {
  const [signupError, setSignupError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { t } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();

    const body = { email, password, firstName, lastName, phone };
    const response = await fetch(`${urlEndpoint}auth/register-local`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const cookieToken = cookie.get('token');
      cookie.set('token', cookieToken, { expires: 2 });
      Router.push('/');
    }
  }
  return (
    <Layout>
      <div className='sign-up-form'>
        <h1>Sign Up Now </h1>
        <form onSubmit={handleSubmit}>
          <input
            className='input-box'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            name='firstName'
            type='firstName'
            placeholder={t('FirstName')}
          />

          <input
            className='input-box'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name='lastName'
            type='lastName'
            placeholder={t('LastName')}
          />

          <input
            className='input-box'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            type='email'
            placeholder={t('Email')}
          />

          <input
            className='input-box'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            type='password'
            placeholder={t('Password')}
          />

          <input
            className='input-box'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name='phone'
            type='phone'
            placeholder={t('Phone')}
          />

          <p>
            <span className='terms'>
              <input type='checkbox' />
            </span>
            I agree to the terms of services
          </p>
          <button type='submit' className='signup-btn'>
            {t('Signup')}
          </button>
          {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
          <hr />
          <p>
            Already have an account?
            <a href='/login' className='login-link'>
              Login
            </a>
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
            button {
              color: #fff;
              width: 100%;
              padding: 10px;
              border-radius: 20px;
              margin: 10px 0;
              border: none;
              outline: none;
              cursor: pointer;
            }
            .signup-btn {
              background-color: #1c8adb;
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

            @media screen and (max-width: 480px) {
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

export default WithLocaleWrapper(Signup);
