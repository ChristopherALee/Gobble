import React from 'react';
import { Link } from 'react-router-dom';

class ChannelSideBar extends React.Component {
  constructor(props) {
    super(props);

    this.renderChannels = this.renderChannels.bind(this);
    this.gobbleMenu = this.gobbleMenu.bind(this);
    this.renderGobbleMenu = this.renderGobbleMenu.bind(this);
    this.removeGobbleMenu = this.removeGobbleMenu.bind(this);
    this.logOut = this.logOut.bind(this);
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

  logOut() {
    this.props.logout();
  }

  gobbleMenu() {
    if (this.props && this.props.gobbleMenuShown && this.props.currentUser) {
      return (
        <div className="gobble-menu">
          <div className="gobble-menu-username">
            <div className="gobble-menu-username-profile-photo">
              *(picture)
            </div>
            <div className="gobble-menu-username-text">
              {this.props.currentUser.username}
            </div>
          </div>
          <div className="logout-button" onClick={this.logOut}>
            Sign Out
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderGobbleMenu() {
    this.props.showMenu();
  }

  removeGobbleMenu() {
    this.props.hideMenu();
  }

  createChannelMenu() {
    if (this.props.createChannelMenuShown) {
      return (
        <div className="create-channel-menu">
          Create Channel
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    let currentUser;
    if (this.props.currentUser) {
      currentUser = this.props.currentUser.username;
    }

    if (this.props.gobbleMenuShown) {
      return (
        <div id="channel-side-bar">
          {this.createChannelMenu()}
          {this.gobbleMenu()}

          <div className="side-bar-contents" onClick={this.removeGobbleMenu}>
            <div className="user-info-container active-sidebar">
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
        </div>
      );
    } else {
      return (
        <div id="channel-side-bar">
          {this.gobbleMenu()}

          <div className="side-bar-contents">
            <div className="user-info-container" onClick={this.renderGobbleMenu}>
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
        </div>
      );
    }
  }
}

export default ChannelSideBar;
