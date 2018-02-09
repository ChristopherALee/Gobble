import React from 'react';

class ChannelSideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllChannels();
  }

  componentWillReceiveProps(newProps) {
    this.props.fetchAllChannels();
  }

  render() {
    let currentUser;
    if (this.props.currentUser) {
      currentUser = this.props.currentUser.username;
    }

    return (
      <div id="channel-side-bar">
        {currentUser}
      </div>
    );
  }
}

export default ChannelSideBar;
