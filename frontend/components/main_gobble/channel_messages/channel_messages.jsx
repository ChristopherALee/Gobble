import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ChannelMessages extends React.Component {
  constructor(props) {
    super(props);

    this.settingsMenu = this.settingsMenu.bind(this);
    this.showChannelSettingsMenu = this.showChannelSettingsMenu.bind(this);
    this.hideChannelSettingsMenu = this.hideChannelSettingsMenu.bind(this);
    this.toggleChannelSettingsMenu = this.toggleChannelSettingsMenu.bind(this);
    this.removeGobbleMenu = this.removeGobbleMenu.bind(this);
    this.dateTimeConversion = this.dateTimeConversion.bind(this);
    this.createMembership = this.createMembership.bind(this);
  }

  createMembership() {
    let channelId = this.props.currentChannel.id;
    let currentUsername = this.props.currentUser.username;

    this.props.createMembership({
      membership: { channel_id: channelId }
    }).then(
      (success) => {
        this.props.fetchCurrentUser(currentUsername);
      }
    );
  }

  dateTimeConversion(dateTime) {
    const months = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December"
    };

    let year = dateTime.slice(0, 4);
    let numMonth = dateTime.slice(5, 7);
    let month = months[numMonth];
    let day = dateTime.slice(8, 10);

    return (
      `${month} ${day}, ${year}`
    );
  }

  removeGobbleMenu() {
    this.props.hideMenu();
  }

  joinChannelFooter(channel) {
    if (this.props.currentUser.subscribedChannels && this.props.currentUser.subscribedChannels.includes(channel.id)) {
      return null;
    } else {
      return (
        <div id="channel-messages-join-channel-container">
          <div className="join-channel-content">
            <h3>You are viewing <strong>#{channel.name}</strong></h3>
            <p>Created by {channel.creatorName} on {this.dateTimeConversion(channel.created_at)}</p>
            <div className="channel-messages-join-channel-button" onClick={this.createMembership}>
              Join Channel
            </div>
          </div>
        </div>
      );
    }
  }

  settingsMenu() {
    let currentChannelName = this.props.currentChannel.name;

    if (this.props.channelSettingsMenuShown) {
      return (
        <div className="channel-messages-settings-menu">
          <div className="settings-leave-channel">Leave #{currentChannelName}</div>
        </div>
      );
    } else {
      return null;
    }
  }

  showChannelSettingsMenu() {
    this.props.showChannelSettingsMenu();
  }

  hideChannelSettingsMenu() {
    this.props.hideChannelSettingsMenu();
  }

  toggleChannelSettingsMenu() {
    if (this.props.channelSettingsMenuShown) {
      this.props.hideChannelSettingsMenu();
    } else {
      this.props.showChannelSettingsMenu();
    }
  }

  render() {
    const channel = this.props.currentChannel;
    const memberCount = this.props.memberCount;
    const purpose = this.props.purpose;

    if (channel) {
      return (
        <div id="channel-messages">
          {this.settingsMenu()}

          <div className="channel-messages-header">
            <div className="channel-messages-header-left">
              <div className="channel-messages-title">#{channel.name}</div>
              <div className="channel-details">
                <div className="channel-detail-member-ct">
                  <i className="far fa-user"></i>
                  {memberCount}
                </div>

                <div className="divider">|</div>

                <div className="channel-detail-purpose">{purpose}</div>
              </div>
            </div>

            <div className="channel-messages-header-right">
              <i className="fas fa-info-circle"></i>
              <div className="channel-settings" onClick={this.toggleChannelSettingsMenu}>
                <i className="fas fa-cog"></i>
              </div>
            </div>
          </div>

          {this.joinChannelFooter(channel)}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ChannelMessages;
