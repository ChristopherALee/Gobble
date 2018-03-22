import React from "react";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import ChannelSideBarContainer from "./channel_sidebar/channel_sidebar_container";
import ChannelMessagesContainer from "./channel_messages/channel_messages_container";
import ChannelDetailContainer from "./channel_detail/channel_detail_container";
import DirectMessagesContainer from "./direct_messaging/direct_messages_container";
import LoadingContainer from "../loading/loading_container";

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
    if (this.props.loading) {
      return (
        <div id="we-gobblin-here">
          <Route path="/" component={LoadingContainer} />
        </div>
      );
    } else {
      return (
        <div id="we-gobblin-here">
          <Route path="/messages" component={ChannelSideBarContainer} />

          <Switch>
            <Route path="/messages/dm" component={DirectMessagesContainer} />
            <Route path="/messages" component={ChannelMessagesContainer} />
          </Switch>
        </div>
      );
    }
  }
}

export default MainGobble;
