
import React from "react";
import useTranslation from '../hooks/useTranslation'



function Features() {
  const { t } = useTranslation()

  return (
    <div className="col-sm-4 shadow-lg p-3 mb-5 bg-white rounded text-center">
      <h4 className="">
        {t('Age')} <span className="badge badge-info ml-2">35</span>
      </h4>
      <h4 className="pt-3">
        {t('Experience')} <span className="badge badge-info ml-2">+5 years</span>
      </h4>
      <h4 className="my-3">{t('Language')}</h4>
      <span className="badge badge-info  p-3 mr-1">{t('English')}</span>
      <span className="badge badge-info  p-3 mr-1">{t('French')}</span>
      <span className="badge badge-info  p-3">{t('Dutch')}</span>
      <style jsx>{`
        span:hover {
          background-color: red;
          color: white;
        }
      `}</style>
    </div>
  );
}
export default Features;
