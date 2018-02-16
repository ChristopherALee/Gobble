// globals Pusher
import React from 'react';
import { Link } from 'react-router-dom';
import CreateChannelForm from './create_channel_form/create_channel_form';

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
    let that = this;
    this.channel.bind('membership_created', function(data) {
      that.props.fetchSingleChannel(data.channel);
    });
  }

  componentWillUnmount() {
    this.pusher.unsubscribe('sidebar_channel');
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
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
    debugger
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
          <CreateChannelForm
            createChannelMenuShown={this.props.createChannelMenuShown}
            removeCreateChannelMenu={this.removeCreateChannelMenu}
            createChannel={this.props.createChannel}
            createMembership={this.props.createMembership}
            fetchSingleChannel={this.props.fetchSingleChannel}
          />
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
