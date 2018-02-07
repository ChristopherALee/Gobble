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
          <a href="http://www.christopheradamlee.com/">
            <div className="cal-logo"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomeNavBar;
