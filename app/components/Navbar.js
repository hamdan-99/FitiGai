import Link from "next/link";
import React, { useState, useEffect } from "react";
import cookie from "js-cookie";
import Router from "next/router";
const Navbar = () => {
  const cookieToken = cookie.get("token");
  const [loggedIn, setLoggedIn] = useState(!!cookieToken);

  useEffect(() => {
    setLoggedIn(!!cookieToken);
  }, [cookieToken]);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
      <img
        className="logo"
        src="/images/fitigai_logo.png"
        alt="logo"
        style={{ width: "50px", height: "50px", borderRadius: "35px" }}
      />
      <a className="navbar-brand ml-3" href="/" style={{ fontSize: "32px" }}>
        <span className="logoName">
          <span id="fit">Fit</span>igai
        </span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor02"
        aria-controls="navbarColor02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {/* <p>Welcome {data.email}</p> */}
      <div className="collapse navbar-collapse" id="navbarColor02 ">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link">
                <span className="navMenue">Home</span>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/about">
              <a className="nav-link">
                <span className="navMenue">About</span>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/contact">
              <a className="nav-link">
                <span className="navMenue">Contact</span>
              </a>
            </Link>
          </li>

          {!loggedIn && (
            <li className="nav-item">
              <Link href="/login">
                <a className="nav-link">
                  <span className="navMenue">Login</span>
                </a>
              </Link>
            </li>
          )}

          {!loggedIn && (
            <li className="nav-item">
              <Link href="/signup">
                <a className="nav-link">
                  <span className="navMenue">Sign up</span>
                </a>
              </Link>
            </li>
          )}

          {loggedIn && (
            <li className="nav-item">
              <Link href="/">
                <a
                  onClick={() => {
                    cookie.remove("token");
                    Router.push("/");
                  }}
                  className="nav-link"
                >
                  <span className="navMenue">Logout</span>
                </a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
