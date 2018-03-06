// globals Pusher
import React from "react";
import { Link } from "react-router-dom";
import CreateChannelForm from "./create_channel_form/create_channel_form";
import ChannelSearch from "./channel_search/channel_search";
import ChannelList from "./channels_dms/channel_list";
import DirectMessageList from "./channels_dms/dm_list";
import UserSearch from "./user_search/user_search";

class ChannelSideBar extends React.Component {
  constructor(props) {
    super(props);

    this.gobbleMenu = this.gobbleMenu.bind(this);
    this.renderGobbleMenu = this.renderGobbleMenu.bind(this);
    this.removeGobbleMenu = this.removeGobbleMenu.bind(this);
    this.renderCreateChannelMenu = this.renderCreateChannelMenu.bind(this);
    this.removeCreateChannelMenu = this.removeCreateChannelMenu.bind(this);
    this.renderChannelSearchMenu = this.renderChannelSearchMenu.bind(this);
    this.removeChannelSearchMenu = this.removeChannelSearchMenu.bind(this);
    this.renderDirectMessageMenu = this.renderDirectMessageMenu.bind(this);
    this.removeDirectMessageMenu = this.removeDirectMessageMenu.bind(this);

    this.logOut = this.logOut.bind(this);
    this.getChannelMessages = this.getChannelMessages.bind(this);
    this.getDirectMessages = this.getDirectMessages.bind(this);
  }

  componentDidMount() {
    this.props
      .fetchCurrentUser(this.props.currentUser.username)
      .then(success => {
        this.props.fetchAllChannels().then(() => {
          if (
            this.props.lastVisitedChannel !==
            this.props.history.location.pathname.slice(10)
          ) {
            this.props.history.push(
              `/messages/${this.props.lastVisitedChannel}`
            );
          }

          let allChannels = this.props.allChannels.map(channel => {
            return channel.name;
          });
          let currentChannel = this.props.location.pathname.slice(10);
          if (allChannels.includes(currentChannel)) {
            this.getChannelMessages(currentChannel);
            this.props.updateUser({
              username: this.props.currentUser,
              last_visited_channel: currentChannel
            });
          }
        });

        this.props.fetchAllDirectMessageChannels().then(() => {
          if (this.props.location.pathname.includes("/dm/")) {
            let currentDm = this.props.history.location.pathname.slice(13);
            this.getDirectMessages(currentDm);
          }
        });
      });

    this.pusher = new Pusher("416ebb2d74bf61955f19", {
      cluster: "us2",
      encrypted: true
    });

    this.channel = this.pusher.subscribe("sidebar_channel");
    let that = this;
    this.channel.bind("membership_created", function(data) {
      that.props.fetchSingleChannel(data.channel);
    });
  }

  componentWillUnmount() {
    this.pusher.unsubscribe("sidebar_channel");
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
      let newPath = newProps.location.pathname.slice(10);
      let allChannels = this.props.allChannels.map(channel => channel.name);

      if (!allChannels.includes(newPath) && !newPath.includes("dm")) {
        this.props.history.push(
          `/messages/${this.props.currentUser.lastVisitedChannel}`
        );
      } else if (newPath !== "") {
        if (newPath.includes("dm")) {
          this.getDirectMessages(parseInt(newPath.slice(3)));
          this.props.updateUser({
            username: this.props.currentUser,
            last_visited_channel: newPath
          });
        } else {
          let newChannel = newProps.location.pathname.slice(10);
          this.getChannelMessages(newChannel);
          this.props.updateUser({
            username: this.props.currentUser,
            last_visited_channel: newChannel
          });
        }
      }
    }
  }

  getDirectMessages(channel) {
    this.props.fetchDirectMessageChannelMessages(channel);
  }

  getChannelMessages(channel) {
    this.props.fetchChannelMessages(channel);
  }

  logOut() {
    this.props.logout();
  }

  gobbleMenu() {
    if (this.props && this.props.gobbleMenuShown && this.props.currentUser) {
      return (
        <div className="gobble-menu">
          <div className="gobble-menu-username">
            {/* <div className="gobble-menu-username-profile-photo">*(picture)</div> */}
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
      return <div />;
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

  renderChannelSearchMenu() {
    this.props.showChannelSearchMenu();
  }

  removeChannelSearchMenu() {
    this.props.hideChannelSearchMenu();
  }

  renderDirectMessageMenu() {
    this.props.showDirectMessageMenu();
  }

  removeDirectMessageMenu() {
    this.props.hideDirectMessageMenu();
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
                  <i className="fas fa-angle-down" />
                </div>
              </div>
              <div className="current-username">
                <div className="active-circle" />
                <div className="username">{currentUser}</div>
              </div>
            </div>

            <div className="side-bar-channels">
              <div className="channels-header">
                <p className="channels-header-content">Channels</p>
                <i className="fas fa-plus-circle" />
              </div>

              <ChannelList
                channels={this.props.channels}
                pathname={this.props.location.pathname}
              />
            </div>

            <div className="side-bar-dms">
              <div className="dms-header">
                <p className="dms-header-content">Direct Messages</p>
              </div>

              <DirectMessageList
                currentUser={this.props.currentUser.username}
                directMessagingChannels={this.props.directMessagingChannels}
                pathname={this.props.location.pathname}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="channel-side-bar">
          <CreateChannelForm
            currentUser={this.props.currentUser}
            fetchCurrentUser={this.props.fetchCurrentUser}
            createChannelMenuShown={this.props.createChannelMenuShown}
            removeCreateChannelMenu={this.removeCreateChannelMenu}
            createChannel={this.props.createChannel}
            createMembership={this.props.createMembership}
            fetchSingleChannel={this.props.fetchSingleChannel}
          />

          <ChannelSearch
            currentUser={this.props.currentUser}
            channelSearchMenuShown={this.props.channelSearchMenuShown}
            removeChannelSearchMenu={this.removeChannelSearchMenu}
            allChannels={this.props.allChannels}
            renderCreateChannelMenu={this.renderCreateChannelMenu}
          />

          <UserSearch
            currentUser={this.props.currentUser}
            fetchCurrentUser={this.props.fetchCurrentUser}
            fetchAllUsers={this.props.fetchAllUsers}
            users={this.props.allUsers}
            userSearchMenuShown={false}
          />

          {this.gobbleMenu()}

          <div className="side-bar-contents">
            <div
              className="user-info-container"
              onClick={this.renderGobbleMenu}
            >
              <div className="channel-name">
                <div className="channel-name-text">
                  Gobble - We Gobblin' Here!
                </div>
                <div className="angle-down-icon">
                  <i className="fas fa-angle-down" />
                </div>
              </div>
              <div className="current-username">
                <div className="active-circle" />
                <div className="username">{currentUser}</div>
              </div>
            </div>

            <div className="side-bar-channels">
              <div className="channels-header">
                <p
                  className="channels-header-content"
                  onClick={this.renderChannelSearchMenu}
                >
                  Channels
                </p>
                <div
                  className="create-channel-button"
                  onClick={this.renderCreateChannelMenu}
                >
                  <i className="fas fa-plus-circle" />
                </div>
              </div>

              <ChannelList
                channels={this.props.channels}
                pathname={this.props.location.pathname}
              />
            </div>

            <div className="side-bar-dms">
              <div className="dms-header">
                <p
                  className="dms-header-content"
                  onClick={this.renderDirectMessageMenu}
                >
                  Direct Messages
                </p>
                <div
                  className="create-dm-button"
                  onClick={this.renderDirectMessageMenu}
                >
                  <i className="fas fa-plus-circle" />
                </div>
              </div>

              <DirectMessageList
                currentUser={this.props.currentUser.username}
                directMessagingChannels={this.props.directMessagingChannels}
                pathname={this.props.location.pathname}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ChannelSideBar;
