import React from "react";
import useTranslation from "../hooks/useTranslation";

const Cards = (props) => {
  const { t } = useTranslation();
  return (
    <div>
      
        <div className="main">
          <div className="card">
            <div className="piccs">
              <img
                src="https://cdn.glitch.com/323a5f71-5800-4689-9792-0fed771775d5%2FScreenshot_20180902-150158_Instagram.jpg?v=1564979250384"
                alt="My name"
                height="140"
                width="140"
                className="piccs"
              />
            </div>
            <div className="info">
              <p id="info1"> {`${props.coachName.firstName}`}</p>
              <i
                id="location"
                className="fa fa-map-marker"
                aria-hidden="true"
              />
              <p id="info5"> {props.card.location}</p>

              <p id="info2">{props.card.title}</p>
              <i
                id="language"
                className="fa fa-comment-o"
                aria-hidden="true"
              ></i>

              <p id="info3">
                {" "}
                {props.coachName.lang.slice(0, 2).toUpperCase()}
              </p>
              <i id="money" className="fa fa-money" aria-hidden="true"></i>
              <p id="info4">
                {" "}
                {props.card.price.toString().substring(0, 2)}€ /h
              </p>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .piccs {
              position: absolute;
              background-color: red;
              left: 15px;
              top: 5px;
              border-radius: 80px;
              opacity: 0.95;
              box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
              border: solid 1px gray;
              z-index: -1;
            }
            .card {
              position: relative;
              left: 0px;
              top: -15px;
              margin: 20px;
              height: 200px;
              width: 360px;
              border-radius: 20px;
              background-color: rgba(148, 225, 245, 0.61);
              border-style: solid;
              box-shadow: 5px 7px 9px -4px rgb(73, 73, 77);
              border: 1px solid rgba(132, 0, 255, 0.37);
              z-index: 2;
            }
            
            .card:hover {
              background-color: rgba(148, 225, 245, 0.41);
            }
            .info {
              position: absolute;
              bottom: 0px;
            }
            @import url("https://fonts.googleapis.com/css2?family=Cabin:wght@1,600&display=swap");
            #info1 {
              font-family: "Cabin", sans-serif;
              position: relative;
              top: -110px;
            
              left: 220px;
              font-weight: 600;
              font-size: 30px;
              color: rgb(0, 0, 0);
            }
            #info5 {
              position: absolute;
              font-family: "Cabin", sans-serif;
              bottom: 80px;
              left: 245px;
              font-size: 20px;
              font-weight: 400;
              color: rgb(0, 0, 0);
            }
            
            #info2 {
              position: absolute;
              background-color: blue;
              text-align: center;
              border-radius: 5px;
              font-family: "Cabin", sans-serif;
              bottom: 45px;
              width: 130px;
              left: 220px;
              color: rgb(255, 255, 255);
            }
            #info3 {
              position: absolute;
              bottom: -8px;
              width: 70px;
              left: 45px;
              font-family: "Cabin", sans-serif;
              color: rgb(0, 0, 0);
              text-align: center;
            }
            #info4 {
              position: absolute;
              bottom: -7px;
              width: 60px;
              color: rgb(0, 0, 0);
              left: 150px;
              font-family: "Cabin", sans-serif;
            }
            #money {
              position: absolute;
              color: rgb(0, 0, 0);
              bottom: 16px;
              width: 80px;
              left: 125px;
            }
            
            #location {
              position: absolute;
              bottom: 107px;
              left: 225px;
              font-size: 17px;
              color: rgb(0, 0, 0);
            }
            #language {
              position: absolute;
              color: rgb(0, 0, 0);
              bottom: 16px;
              width: 80px;
              left: 25px;
            }
          `}
        </style>
    </div>
  );
};

export default Cards;
