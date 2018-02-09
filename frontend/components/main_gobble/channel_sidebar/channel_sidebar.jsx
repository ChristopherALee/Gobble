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
        <div className="user-info-container">
          {currentUser}
        </div>

        <div className="side-bar-channels">

        </div>

        <div className="side-bar-dms">

        </div>
      </div>
    );
  }
}

export default ChannelSideBar;
