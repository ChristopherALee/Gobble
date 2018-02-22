import React from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import ChannelSideBarContainer from './channel_sidebar/channel_sidebar_container';
import ChannelMessagesContainer from './channel_messages/channel_messages_container';

class MainGobble extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
      let newPath = newProps.location.pathname;

      if (!newPath.includes("messages")) {
        this.props.history.push("/messages");
      }
    }
  }

  render() {
    return (
      <div id="we-gobblin-here">
        <Route path='/messages' component={ChannelSideBarContainer}></Route>
        <Route path='/messages' component={ChannelMessagesContainer}></Route>
      </div>
    );
  }
}

export default MainGobble;
