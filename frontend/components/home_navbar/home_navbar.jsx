import React from 'react';
import { withRouter, Link } from 'react-router-dom';

const HomeNavBar = (props) => {
  return (
    <div className="home-navbar-container">
      <div className="home-navbar-left">
        <div className="home-navbar-logo">

        </div>

        <div className="gobble">gobble</div>
      </div>

      <div className="home-navbar-right">
        <div className="home-navbar-links">
          <a href="http://www.christopheradamlee.com/" target="_blank">
            <div className="cal-logo"></div>
          </a>

          <a href="https://github.com/ChristopherALee" target="_blank">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/christopheradamlee/" target="_blank">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeNavBar;
