import React from 'react';
import { Link } from 'react-router-dom';

class ChannelSideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderGobbleMenu: false
    };

    this.renderChannels = this.renderChannels.bind(this);
    this.renderGobbleMenu = this.renderGobbleMenu.bind(this);
    this.removeGobbleMenu = this.removeGobbleMenu.bind(this);
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

  gobbleMenu() {
    if (this.state.renderGobbleMenu && this.props.currentUser) {
      return (
        <div className="gobble-menu">
          <p>{this.props.currentUser.username}</p>
          <div className="logout-button">
            <p>Log Out</p>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderGobbleMenu() {
    this.setState({['renderGobbleMenu']: !this.state.renderGobbleMenu});
  }

  removeGobbleMenu() {
    this.setState({['renderGobbleMenu']: false});
  }

  render() {
    let currentUser;
    if (this.props.currentUser) {
      currentUser = this.props.currentUser.username;
    }

    if (this.state.renderGobbleMenu) {
      return (
        <div id="channel-side-bar" onClick={this.renderGobbleMenu}>
          {this.gobbleMenu()}

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

          <div className="side-bar-channels" onClick={this.removeGobbleMenu}>
            <div className="channels-header">
              <p className="channels-header-content">Channels</p>
              <i className="fas fa-plus-circle"></i>
            </div>

            <ul className="channel-list" onClick={this.removeGobbleMenu}>
              {this.renderChannels()}
            </ul>
          </div>

          <div className="side-bar-dms" onClick={this.removeGobbleMenu}>

          </div>
        </div>
      );
    } else {
      return (
        <div id="channel-side-bar">
          {this.gobbleMenu()}

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

          <div className="side-bar-channels" onClick={this.removeGobbleMenu}>
            <div className="channels-header">
              <p className="channels-header-content">Channels</p>
              <i className="fas fa-plus-circle"></i>
            </div>

            <ul className="channel-list" onClick={this.removeGobbleMenu}>
              {this.renderChannels()}
            </ul>
          </div>

          <div className="side-bar-dms" onClick={this.removeGobbleMenu}>

          </div>
        </div>
      );
    }
  }
}

export default ChannelSideBar;
