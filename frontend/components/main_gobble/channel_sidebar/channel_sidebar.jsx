import React from 'react';
import { Link } from 'react-router-dom';

class ChannelSideBar extends React.Component {
  constructor(props) {
    super(props);

    this.renderChannels = this.renderChannels.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllChannels();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
      this.props.fetchAllChannels();
    }
  }

  renderChannels() {
    let channels;
    let that = this;
    if (this.props.channels.length) {
      channels = this.props.channels.map((channel, idx) => {
        if (channel.name === that.props.location.pathname.slice(10)) {
          return (
            <Link
              to={`/messages/${channel.name}`}
              className="active-channel"
              key={idx}>
              <li key={idx}>
                <div>#</div>
                {channel.name}
              </li>
            </Link>
          );
        } else {
          return (
            <Link
              to={`/messages/${channel.name}`}
              key={idx}>
            <li>
              <div>#</div>
              {channel.name}
            </li>
          </Link>
        );
        }
      });
    }

    return channels;
  }

  render() {
    let currentUser;
    if (this.props.currentUser) {
      currentUser = this.props.currentUser.username;
    }

    return (
      <div id="channel-side-bar">
        <div className="user-info-container">
          <div className="channel-name">
            <div className="channel-name-text">
              Gobble - We Gobblin' Here!
            </div>
            <div className="angle-down-icon">
              <i className="fas fa-angle-down"></i>
            </div>
          </div>
          <div className="current-username">
            <div className="active-circle"></div>
            <div className="username">
              {currentUser}
            </div>
          </div>
        </div>

        <div className="side-bar-channels">
          <div className="channels-header">
            <p className="channels-header-content">Channels</p>
            <i className="fas fa-plus-circle"></i>
          </div>

          <ul className="channel-list">
            {this.renderChannels()}
          </ul>
        </div>

        <div className="side-bar-dms">

        </div>
      </div>
    );
  }
}

export default ChannelSideBar;
