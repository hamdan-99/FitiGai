import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import data from '../utils/data';
import useTranslation from '../hooks/useTranslation';
import fetch from 'node-fetch';

const urlEndpoint = `https://fitigai-api.herokuapp.com/v1/`;

export default function Search() {
  let [location, setLocation] = useState('');
  let [title, setTitile] = useState('');

  const router = useRouter();
  const { locale, t } = useTranslation();

  const handleClick = (event) => {
    event.preventDefault();

    if (title.length === 0) {
      alert(t('FillAlert'));
      router.push({
        pathname: `/${locale}`,
      });
    } else {
      router.push({
        pathname: `/${locale}/results`,
        query: {
          title: title.trim().toLowerCase(),
          location: location.trim().toLowerCase(),
        },
      });
    }
  };
  return (
    <div className='searchPage'>
      <section className='banner text-center'>
        <h1>
          FIND A <span className='banner-blue'>SPORTS COACH </span>NEAR YOU{' '}
        </h1>
        <p>We provide you with the best sports coaches in Belgium</p>
        <div className='search-info text-center'>
          <input
            type='text'
            className='form-control'
            placeholder={t('Sport')}
            onChange={(e) => setTitile(e.target.value)}
          />
          <input
            type='text'
            className='form-control'
            placeholder={t('Location')}
            onChange={(e) => setLocation(e.target.value)}
          />

          <Link href='/results'>
            <button
              onClick={handleClick}
              type='submit'
              className='btn btn-primary'
            >
              Search
            </button>
          </Link>
        </div>
      </section>
      <style jsx>
        {`
          .searchPage {
            height: 90vh;
          }

          .banner h1 {
            color: #fff;
            padding-top: 170px;
            font-size: 40px;
            letter-spacing: 5px;
            font-weight: 600;
            text-shadow: 0 0 30px rgba(0, 0, 0, 0.9);
          }
          .banner p {
            color: #fff;
            font-size: 22px;
            margin-left: 18px;
            text-shadow: 0 0 30px rgba(0, 0, 0, 0.9);
          }
          .banner-blue {
            color: #007bff;
          }
          .search-info {
            padding-top: 20px;
            padding-left: 0px;
          }
          .search-info .form-control {
            max-width: 200px;
            display: inline-flex;
            margin: 10px 5px;
            border-radius: 10px;
            box-shadow: none !important;
            border: none !important;
          }
          .search-info .btn-primary {
            border-radius: 10px;
            box-shadow: none;
            border: none;
            display: inline-flex;
            margin: 0 5px;
            padding: 7px 20px;
          }
          .search-info .btn-primary:hover {
            opacity: 0.9;
          }
          @media screen and (max-width: 480px) {
            .banner {
              min-height: 90vh;
              padding-top: 30px;
            }
            .banner h1 {
              padding-top: 70px;
              font-size: 40px;
              letter-spacing: 3px;
              font-weight: 600;
              text-shadow: 0 0 30px rgba(0, 0, 0, 0.9);
            }

            .search-info .form-control {
              display: block;
              margin: 10px auto;
            }
            .search-info .btn-primary {
              width: 200px;
              margin: auto;
            }
          }
        `}
      </style>
    </div>
  );
}
