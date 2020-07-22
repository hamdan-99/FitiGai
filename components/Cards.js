
import React from "react";
import useTranslation from '../hooks/useTranslation'


const Cards = (props) => {
  const { t } = useTranslation()
console.log('props 0',props)
  return (
    <div>
      {props.card && (
        <section id="team" className="pb-5">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-4">
                <div className="image-flip">
                  <div className="mainflip flip-0">
                    <div>
                      {/* frontside */}
                      <div className="frontside">
                        <div className="card-body text-center">
                          <img
                            src="https://cdn.glitch.com/323a5f71-5800-4689-9792-0fed771775d5%2Fdefault-user.png?v=1587762169218"
                            alt="My name"
                            id="pic"
                            height="120"
                            width="120"
                          />
                          <div className="coachInfo">
                            <p className="card-name">{`${props.coachName.firstName} ${props.coachName.lastName}`}</p>
                            <h5 className="card-title">{props.card.title}</h5>
                            <p className="card-location">
                              {props.card.location}
                            </p>
                            <p className="card-lang">
                              {props.coachName.lang.slice(0, 2).toUpperCase()}
                            </p>
                            <p className="card-price">
                              {props.card.price.toString().substring(0, 3)}$/h
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* end */}

                      {/* backside */}

                      <div className="backside">
                        <a className="btn-neon">
                          <div>
                            <h4 className="card-head">{t('About')}</h4>
                            <p className="card-text">
                              <span className="backText">
                                {t(props.card.description)}
                              </span>
                            </p>
                          </div>
                          <svg height="270" width="200">
                            <polyline points="0,0 200,0 200,265 0,265 0,00"></polyline>{" "}
                          </svg>
                        </a>
                      </div>
                      {/* end */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* ******************************************************************* */}

      {props.all && (
        <section id="team" className="pb-5">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-4">
                <div className="image-flip">
                  <div className="mainflip flip-0">
                    <div>
                      {/* frontside */}
                      <div className="frontside">
                        <div className="card-body text-center">
                          <img
                            src="https://cdn.glitch.com/323a5f71-5800-4689-9792-0fed771775d5%2Fdefault-user.png?v=1587762169218"
                            alt="My name"
                            id="pic"
                            height="120"
                            width="120"
                          />
                          <div className="coachInfo">
                            <p className="card-name">{`${props.coachName.firstName} ${props.coachName.lastName}`}</p>
                            <h5 className="card-title">{(props.all.title)}</h5>
                            <p className="card-location">
                              {(props.all.location)}
                            </p>
                            <p className="card-lang">
                              {props.coachName.lang.slice(0, 2).toUpperCase()}
                            </p>
                            <p className="card-price">
                              {props.all.price.toString().substring(0, 3)}$/h
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* end */}

                      {/* backside */}

                      <div className="backside">
                        <a className="btn-neon">
                          <div>
                            <h4 className="card-head">{t('About')}</h4>
                            <p className="card-text">
                              <span className="backText">
                                {(props.all.description)}
                              </span>
                            </p>
                          </div>
                          <svg height="270" width="200">
                            <polyline points="0,0 200,0 200,265 0,265 0,00"></polyline>{" "}
                          </svg>
                        </a>
                      </div>
                      {/* end */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Cards;
