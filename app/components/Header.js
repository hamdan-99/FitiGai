
import React from "react";
import useTranslation from '../hooks/useTranslation'


function Header() {
  const { t } = useTranslation()

  return (
    <div
      className="row  mx-auto mt-5 p-2 shadow-lg p-3 mb-5 bg-white rounded"
      style={{ maxWidth: 1000 }}
    >
      <div className="col-md-4 my-auto">
        <img
          className="mx-auto d-block h-75 w-75 rounded-circle"
          src="/images/mustaph.jpg"
          alt="my_profile_photo"
        />
      </div>
      <div className="col-md-5 pr-5 text-center ">
        <h2 className="mt-4">John Doe</h2>
        <p className="mt-2">{t('Tennis')}</p>
        <span className="fa fa-star  mt-1 text-success"></span>
        <span className="fa fa-star  ml-2 mt-1 text-success"></span>
        <span className="fa fa-star  ml-2 mt-1 text-success"></span>
        <span className="fa fa-star ml-2 mt-1 text-secondary"></span>
        <span className="fa fa-star ml-2 mt-1 text-secondary"></span>
        <p className="mt-2">{t('Location')}</p>
      </div>
      <div className="col-md-3 text-center my-auto">
        <p className="pr-3 mt-4">90€ / h </p>
        <button type="button" className="btn btn-primary btn-sm px-5">
          {t('ContactMe')}
        </button>
      </div>
    </div>
  );
}
export default Header;
