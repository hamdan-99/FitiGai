import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import Router from 'next/router';
import useTranslation from '../hooks/useTranslation';
import LocaleSwitcher from './LocaleSwitcher';

const Navbar = () => {
  const cookieToken = cookie.get('token');
  const [loggedIn, setLoggedIn] = useState(!!cookieToken);
  const { locale, t } = useTranslation();

  useEffect(() => {
    setLoggedIn(!!cookieToken);
  }, [cookieToken]);

  return (
    <section id='header'>
      <div className='menu-bar'>
        <nav className='navbar navbar-expand-lg navbar-light'>
          <a
            className='navbar-brand ml-3'
            href='/'
            style={{ fontSize: '32px' }}
          >
            <span className='logoName'>
              <span id='fit'>Fitigai</span>
            </span>
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <div className='navbar-nav ml-auto'>
              {!loggedIn && (
                <Link href='/[lang]/login' as={`/${locale}/login`}>
                  <button className='btn btn-outline-primary'>
                    {t('Login')}
                  </button>
                </Link>
              )}

              {!loggedIn && (
                <Link href='/[lang]/signup' as={`/${locale}/signup`}>
                  <button className='btn btn-success'>{t('Signup')}</button>
                </Link>
              )}

              {loggedIn && (
                <Link href='/[lang]' as={`/${locale}`}>
                  <button
                    onClick={() => {
                      cookie.remove('token');
                      Router.push('/');
                    }}
                    className='btn btn-outline-danger'
                  >
                    {t('Logout')}
                  </button>
                </Link>
              )}
              <LocaleSwitcher />
            </div>
          </div>
        </nav>
      </div>
      <style jsx>
        {`
          .menu-bar {
            background-color: #008489;
          }
          .navMenu {
            color: #fff;
            margin-right: 20px;
          }
          .navMenu:hover {
            color: lightblue;
          }
          .btn-outline-primary {
            color: #fff;
            margin-left: -15px;
            border: none;
          }
          .btn-outline-primary:hover {
            background-color: inherit;
            color: lightblue;
          }
          .btn-success {
            color: #fff;
            border-radius: 20px;
            margin-right: 10px;
          }
          .logoName:hover {
            box-shadow: 0 8px 6px -6px #44f59cd7;
            
          }
          @import url('https://fonts.googleapis.com/css2?family=Faster+One&family=Monoton&family=Pacifico&display=swap');
          .logoName {
            font-family: 'Faster One', cursive;
            position: relative;
            top: -4px;
          }
          #fit {
            color: #fff;
          }
          @media screen and (max-width: 480px) {
            .btn-success {
              width: 30%;
              margin: 5px 0;
            }
            .btn-outline-primary {
              width: 30%;
              margin: 5px 0;
            }
          }
        `}
      </style>
    </section>
  );
};
export default Navbar;

