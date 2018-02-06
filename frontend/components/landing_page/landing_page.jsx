import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const LandingPage = (props) => {
  return (
    <div className="landing-page-container">
      <div className="landing-page-contents">
        <div className="landing-page-image">

        </div>

        <div className="landing-page-intro">
          <h1>Let's Start Gobblin'</h1>
          <p>When your team needs to kick off a project, hire a new employee, deploy some code, review a sales contract, finalize next year's budget, measure an A/B test, plan your next office opening, and more, Gobble has you covered.</p>

          <div className="landing-page-signup-login">
            <Link to="/signup" className="landing-page-signup">
              Get Started
            </Link>

            <p className="already-gobblin">
              Already Gobblin'? <Link to="/login" className="landing-page-login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
