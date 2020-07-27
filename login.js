import React, { useState } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import Layout from '../../components/Layout';
import WithLocaleWrapper from '../../hocs/withLocale';
import useTranslation from '../../hooks/useTranslation';
import { validateEmail, validatePassword } from '../../utils/validation';

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

const Login = (props) => {
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    const body = { email, password };

    fetch(`${urlEndpoint}auth/login-local`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.token) {
          //set cookie
          cookie.set('token', res.token, { expires: 2 });
          localStorage.setItem('token', res.token);
          // props.setToken(res.token)
          Router.push('/');
        }
      });
  }
  return (
    <Layout>
      <div className='login-form'>
        <h1>Log In </h1>
        <form onSubmit={handleSubmit}>
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

          <button type='submit' className='login-btn'>
            {t('Login')}
          </button>

          <hr />
          <p>
            Don't have an account?
            <a href='/signup' className='login-link'>
              Sign Up
            </a>
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
            .login-btn {
              background-color: #1c8adb;
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
    </Layout>
  );
};

export default WithLocaleWrapper(Login);
