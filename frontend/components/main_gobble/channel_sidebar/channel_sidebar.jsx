// globals Pusher
import React from 'react';
import { Link } from 'react-router-dom';

class ChannelSideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      purpose: ''
    };

    this.renderChannels = this.renderChannels.bind(this);
    this.gobbleMenu = this.gobbleMenu.bind(this);
    this.renderGobbleMenu = this.renderGobbleMenu.bind(this);
    this.removeGobbleMenu = this.removeGobbleMenu.bind(this);
    this.renderCreateChannelMenu = this.renderCreateChannelMenu.bind(this);
    this.removeCreateChannelMenu = this.removeCreateChannelMenu.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getChannelMessages = this.getChannelMessages.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllChannels().then(
      () => {
        if (this.props.lastVisitedChannel) {
          this.props.history.push(`/messages/${this.props.lastVisitedChannel}`);
        }

        let currentChannel = this.props.location.pathname.slice(10);
        if (currentChannel) {
          this.getChannelMessages(currentChannel);
          this.props.updateUser({
            username: this.props.currentUser,
            last_visited_channel: currentChannel
          });
        }
      }
    );

    this.pusher = new Pusher('416ebb2d74bf61955f19', {
      cluster: 'us2',
      encrypted: true
    });

    this.channel = this.pusher.subscribe('sidebar_channel');
  }

  componentWillUnmount() {
    this.pusher.unsubscribe('sidebar_channel');
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
      debugger
      if (newProps.location.pathname.slice(10) !== "") {
        let newChannel = newProps.location.pathname.slice(10);
        this.getChannelMessages(newChannel);
        this.props.updateUser({
          username: this.props.currentUser,
          last_visited_channel: newChannel
        });
      }
    }
  }

  handleChange(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.activeSubmit()) {
      const channel = Object.assign({}, this.state);
      this.props.createChannel({channel: channel}).then(
        (success) => {
          this.props.createMembership({membership: {channel_id: success.id}});
          this.removeCreateChannelMenu();
          this.setState({
            ['name']: '',
            ['purpose']: ''
          });

          let that = this;
          this.channel.bind('channel_created', function(data) {
            that.props.fetchSingleChannel(success.name);
          });
        }
      );
    }
  }

  getChannelMessages(channel) {
    this.props.fetchChannelMessages(channel);
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

  activeSubmit() {
    if (this.state.name.length && !this.isErrors()) {
      return 'green-submit';
    } else {
      return null;
    }
  }

  isErrors() {
    if (
      this.state.name.length >= 22
      || this.state.name !== this.state.name.toLowerCase()
      || this.state.name.includes(' ')
      || this.state.name.includes('.')
    ) {
      return 'channel-input-errors';
    } else {
      return null;
    }
  }

  createChannelMenu() {
    if (this.props.createChannelMenuShown) {
      return (
        <div className="create-channel-menu">
          <div className="close-create-channel-menu" onClick={this.removeCreateChannelMenu}>
            <i className="fas fa-times"></i>
            <p>esc</p>
          </div>
          <div className="create-channel-menu-container">
            <div className="create-channel-menu-contents">
              <h1>Create a channel</h1>
              <p className="create-channel-description">Channels are where your members communicate. They're best when organized around a topic - #bread, for example.</p>

              <form className="create-channel-form">
                <div className="channel-form-input">
                  <p>Name</p>
                  <div className={`${this.isErrors()} channel-input-container`}>
                    <p className="hashtag">#</p>
                    <input
                      type="text"
                      value={this.state.name}
                      onChange={this.handleChange("name")}
                      className="create-channel-form-name-input"/>
                  </div>
                  <span>Names must be lowercase, without spaces or periods, and shorter than 22 characters.</span>
                </div>
                <div className="channel-form-input">
                  <div className="purpose-container">
                    <p>Purpose</p>
                    <p id="italic">(optional)</p>
                  </div>
                  <div className="channel-input-container">
                    <input
                      type="text"
                      value={this.state.purpose}
                      onChange={this.handleChange("purpose")}
                      className="create-channel-form-purpose-input"/>
                  </div>
                  <span>What's this channel about?</span>
                </div>

                <div className="create-channel-submit-button-container">
                  <input
                    type="submit"
                    id={`${this.activeSubmit()}`}
                    onClick={this.handleSubmit}
                    value="Create Channel"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderCreateChannelMenu() {
    this.props.showCreateChannelMenu();
  }

  removeCreateChannelMenu() {
    this.props.hideCreateChannelMenu();
  }

  render() {
    let currentUser;
    if (this.props.currentUser) {
      currentUser = this.props.currentUser.username;
    }

    if (this.props.gobbleMenuShown) {
      return (
        <div id="channel-side-bar">
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
          {this.createChannelMenu()}
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
                <div className="create-channel-button" onClick={this.renderCreateChannelMenu}>
                  <i className="fas fa-plus-circle"></i>
                </div>
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
