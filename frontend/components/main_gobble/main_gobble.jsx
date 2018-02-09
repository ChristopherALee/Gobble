import React from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import ChannelSideBarContainer from './channel_sidebar/channel_sidebar_container';

class MainGobble extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Route path='/messages' component={ChannelSideBarContainer}></Route>
    );
  }
}

export default MainGobble;
