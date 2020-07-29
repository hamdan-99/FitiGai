import React from 'react';
import useTranslation from '../hooks/useTranslation';

const Cards = (props) => {
  const { t } = useTranslation();
  return (
    <div className='container'>
      <img
        src={`/images/${props.coachName.firstName.toUpperCase()}.png`}
        alt='profile-img'
        className='profile-img'
      />
      <div className='content'>
        <div className='sub-content'>
          <h1>{`${props.coachName.firstName}`}</h1>

          <p>{props.card.title.toUpperCase()}</p>
          <span className='location'>
            <i className='fa fa-map-marker' aria-hidden='true'></i>
            {props.card.location}
          </span>
        </div>
        <div className='data'>
          <div className='inner-data'>
            <span>
              <i className='fa fa-globe' aria-hidden='true'></i>
            </span>
            <p>{props.coachName.lang.slice(0, 2).toUpperCase()}</p>
          </div>

          <div className='inner-data'>
            <span>
              <i className='fa fa-money' aria-hidden='true'></i>
            </span>
            <p>{props.card.price}€ /h</p>
          </div>
          <div className='btn'>View Profile</div>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            width: 280px;
            height: 400px;
            // margin: 40px 0;
            background: #fff;
            position: relative;
            border-radius: 10px;
            transition: 0.5s ease;
            cursor: pointer;
            box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.16);
          }

          .container .profile-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            position: absolute;
            top: 10px;
            left: 85px;
            border: 5px solid #a4d9f9;
          }
          .container:hover {
            transform: scale(1.15);
            box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
          }
          .content {
            padding: 110px 20px 20px;
          }

          .content .sub-content {
            text-align: center;
            padding-top: 20px;
          }

          .content .sub-content h1 {
            text-transform: uppercase;
            font-size: 24px;
            color: #1da1f2;
          }

          .content .sub-content span {
            font-size: 12px;
            color: #494949;
          }

          .content .sub-content p {
            margin-top: 15px;
            font-weight: 600;
          }

          .content .sub-content span.location {
            display: block;
            margin: 5px 0 20px;
          }

          .content .sub-content span.location .fa {
            font-size: 18px;
            margin-right: 5px;
          }

          .content .sub-content a {
            color: #1da1f2;
          }

          .data {
            width: 100%;
            overflow: hidden;
            margin: 30px 0 20px;
          }

          .inner-data {
            width: 50%;
            float: left;
            text-align: center;
          }

          .inner-data span .fa {
            font-size: 30px;
            margin-bottom: 5px;
            color: #1da1f2;
          }

          .btn {
            clear: both;
            text-align: center;
            width: 100%;
            height: 35px;
            background: #1da1f2;
            color: #fff;
            text-transform: uppercase;
            line-height: 38px;
            font-weight: 600;
            cursor: pointer;
            border-radius: 10px;
            text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          }
          .fa-map-marker {
            color: red;
          }
        `}
      </style>
    </div>
  );
};

export default Cards;
