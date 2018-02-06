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
          <p className="intro-text">
            Whether you quack, chirp, or gobble, staying in contact with your closest winged buddies (or co-workers) has never been easier. Schedule group flights? Lamp-post hang-outs? Bi-weekly bread buffets at the park? We have you covered. <strong>Start Gobblin', with Gobble.</strong>
          </p>

          <div className="landing-page-signup-login">
            <Link to="/signup">
              <button className="landing-page-signup">
                GET STARTED
              </button>
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
