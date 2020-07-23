import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import Router from 'next/router';
import useTranslation from '../hooks/useTranslation';

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
          <img
            className='logo'
            src='/images/fitigai_logo.png'
            alt='logo'
            style={{ width: '50px', height: '50px', borderRadius: '35px' }}
          />
          <a
            className='navbar-brand ml-3'
            href='/'
            style={{ fontSize: '32px' }}
          >
            <span className='logoName'>
              <span id='fit'>Fit</span>igai
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
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <Link href='/[lang]' as={`/${locale}`}>
                  <a className='nav-link'>
                    <span className='navMenue'>{t('Home')}</span>
                  </a>
                </Link>
              </li>
            </ul>

            {!loggedIn && (
              <Link href='/[lang]/login' as={`/${locale}/login`}>
                <button className='btn btn-outline-primary'>
                  {t('Login')}
                </button>
              </Link>
            )}

            {!loggedIn && (
              <Link href='/[lang]/signup' as={`/${locale}/signup`}>
                <button className='btn btn-outline-success'>
                  {t('Signup')}
                </button>
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
          </div>
        </nav>
      </div>
      <style jsx>
        {`
          .menu-bar {
            background-color: rgb(36, 36, 36, 0.7);
          }
          button {
            border: none;
          }
          .btn-outline-primary {
            margin-left: -15px;
          }
        `}
      </style>
    </section>
  );
};
export default Navbar;
