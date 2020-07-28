import React, { useState } from 'react'
import useTranslation from '../hooks/useTranslation';

function CoachProfile(main_props) {
  const { locale, t } = useTranslation();
  let [props, setProps] = useState(main_props)

  return (
    <div className="row my-auto mt-5 p-5  text-info" >
      <div className="col-md-3 my-auto">
        <img
          className="mx-auto d-block h-75 w-75 rounded"
          src="/images/mustaph.jpg"
          alt="my_profile_photo"
        />
        <h5 className=" text-center mt-2">{props.name}</h5>
        <p className="text-center font-weight-light">{props.title}</p>
      </div>
      <div className="col-md-3 pr-5 ">
        <h6 className="text-center">{t('AboutMe')}</h6>
        <hr></hr>
        <p className="mt-1 text-center">
          {" "}
          {props.description}
        </p>
        <div className="d-flex justify-content-center align-items-center my-5">
          {" "}
          <button type="button" className="btn btn-info text-white  btn-lg">
            {t('ContactMe')}
          </button>
        </div>
      </div>
      <div className="col-md-6">
        <div className="row">
          <div className="col-sm-6">
            <h6 className="text-center">{t('Features')}</h6>
            <hr></hr>
            <ul>

              <li className="mb-2">
                {t('Language')} : <span className="font-weight-bold">{props.language}</span>{" "}
              </li>
              <li className="mb-2">
                {t('Location')}  : <span className="font-weight-bold">{props.location}</span>{" "}
              </li>
              <li className="mb-2">
                {t('Price')} : <span className="font-weight-bold">{props.price}/h</span>{" "}
              </li>

            </ul>
          </div>
          <div className="col-sm-6">
            <h6 className="text-center">{t('OtherServices')}</h6>
            <hr></hr>
            <span className="font-weight-bold">{(props.coachServices.length > 0 && (
              <ul>
                {props.coachServices.map((i) => (
                  <li key={i.title}>{i.title}</li>
                ))}
              </ul>
            )) ||
              props.title}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CoachProfile;