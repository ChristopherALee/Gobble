import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import ChannelDetailContainer from '../channel_detail/channel_detail_container';

class ChannelMessages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      newMessages: false,
      newMessageBannerShown: "hidden"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createMembership = this.createMembership.bind(this);
    this.removeMembership = this.removeMembership.bind(this);
    this.dateTimeConversion = this.dateTimeConversion.bind(this);
    this.renderMessages = this.renderMessages.bind(this);
    this.getChannelMessages = this.getChannelMessages.bind(this);
    this.getChannelMessage = this.getChannelMessage.bind(this);
    this.fetchSingleChannel = this.fetchSingleChannel.bind(this);

    // UI functions
    this.hideAllMenus = this.hideAllMenus.bind(this);
    this.settingsMenu = this.settingsMenu.bind(this);
    this.showChannelSettingsMenu = this.showChannelSettingsMenu.bind(this);
    this.hideChannelSettingsMenu = this.hideChannelSettingsMenu.bind(this);
    this.toggleChannelSettingsMenu = this.toggleChannelSettingsMenu.bind(this);
    this.removeGobbleMenu = this.removeGobbleMenu.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.pusher = new Pusher('416ebb2d74bf61955f19', {
      cluster: 'us2',
      encrypted: true
    });

    this.channel = this.pusher.subscribe('channel_messages');
    let that = this;
    this.channel.bind('message_created', function(data) {
      that.fetchSingleChannel(data.channelName);
      that.getChannelMessages(that.props.currentChannel.name);
    });
  }

  componentWillUnmount() {
    this.channel = this.pusher.unsubscribe('channel_messages');
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
      this.setState({["newMessages"]: false});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      document.getElementById("scroll-identifier").scrollIntoView({
        behavior: "instant"
      });
    }
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const channel = this.props.currentChannel.name;

    this.props.createMessage({message: {
      body: this.state.body,
      channel_id: this.props.currentChannel.id
    }}).then(
      (success) => {
        this.setState({['body']: ""});
        document.getElementById("scroll-identifier").scrollIntoView({
          behavior: "smooth"
        });
      }
    );
  }

  fetchSingleChannel(channel) {
    this.props.fetchSingleChannel(channel);
  }

  getChannelMessages(channel) {
    this.props.fetchChannelMessages(channel).then(
      (success) => {
        const scrollHeight = document.getElementById("messages-container").scrollHeight;
        const scrollTop = document.getElementById("messages-container").scrollTop;
        const bottomHeight = scrollHeight - scrollTop;
        const containerHeight = document.getElementById("messages-container").clientHeight + 500;

        if (
          this.state.body === ""
          && (bottomHeight > containerHeight)
        ) {
          this.setState({['newMessages']: true});
          this.setState({["newMessageBannerShown"]: "shown"});
        } else if (this.state.body === "") {
          document.getElementById("scroll-identifier").scrollIntoView({
           behavior: "smooth"
         });
        }
      }
    );
  }

  getChannelMessage(message) {
    this.props.fetchSingleMessage(message);
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
    ).then(
      this.hideChannelSettingsMenu()
    );
  }

  removeMembership() {
    const channelId = this.props.currentChannel.id;
    const currentUsername = this.props.currentUser.username;
    const membership = this.props.membership;

    this.props.removeMembership(membership[0].membershipId).then(
      (success) => {
        this.props.fetchCurrentUser(currentUsername);
      }
    ).then(
      this.hideChannelSettingsMenu()
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
    if (this.props.currentUser.subscribedChannels && this.props.currentUser.subscribedChannels.includes(channel.name)) {
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
    let currentChannelId = this.props.currentChannel.id;

    if (this.props.channelSettingsMenuShown && (this.props.currentUser.subscribedChannels && this.props.currentUser.subscribedChannels.includes(currentChannelId))) {
      return (
        <div className="channel-messages-settings-menu">
          <div className="settings-leave-channel">
            <p onClick={this.removeMembership}>Leave #{currentChannelName}</p>
          </div>
        </div>
      );
    } else if (this.props.channelSettingsMenuShown && (this.props.currentUser.subscribedChannels && !this.props.currentUser.subscribedChannels.includes(currentChannelId))) {
      return (
        <div className="channel-messages-settings-menu">
          <div className="settings-leave-channel">
            <p onClick={this.createMembership}>Join #{currentChannelName}</p>
          </div>
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
    if (this.props.channelSettingsMenuShown) {
      this.props.hideChannelSettingsMenu();
    }
  }

  toggleChannelSettingsMenu() {
    if (this.props.channelSettingsMenuShown) {
      this.props.hideChannelSettingsMenu();
    } else {
      this.props.showChannelSettingsMenu();
    }
  }

  hideAllMenus() {
    if (this.props.gobbleMenuShown) {
      this.props.hideMenu();
    }

    if (this.props.channelSettingsMenuShown) {
      this.props.hideChannelSettingsMenu();
    }
  }

  renderBlankChannel() {
    return (
      <div id="channel-messages-blank-channel">
        <div className="blank-channel-container">
          <div className="blank-channel-chicken-image"></div>
          <h2>Gah! Nothing's here! Click a channel on the left to view!</h2>
        </div>
      </div>
    );
  }

  renderNewMessageBanner() {
    if (this.state.newMessages) {
      return (
        <div id="new-message-banner">
          <p>New messages in #{this.props.currentChannel.name} (click here to scroll down)</p>
        </div>
      );
    } else {
      return null;
    }
  }

  scrollToBottom() {
    document.getElementById("scroll-identifier").scrollIntoView({
     behavior: "smooth"
   });
   this.setState({
     ["newMessages"]: false,
     ["newMessageBannerShown"]: "hidden"
   });
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

    let hour;
    let minutes;
    let amOrPm;
    if (dateTime.slice(11, 12) === "0") {
      hour = dateTime.slice(12,13);
      minutes = dateTime.slice(14, 16);
      amOrPm = "am";
    } else {
      hour = String(parseInt(dateTime.slice(11, 13)) - 12);
      minutes = dateTime.slice(14, 16);
      amOrPm = "pm";
    }

    return (
      `${month} ${day}, ${year} at ${hour}:${minutes}${amOrPm}`
    );
  }

  renderMessages() {
    let messages = this.props.messages;

    messages = messages.map((message, idx) => {
      let timeStamp = this.dateTimeConversion(message.created_at);
      let lastMessage;

      if (idx === messages.length - 1) {
        lastMessage = "last-message";
      }

      return (
        <li id={lastMessage} key={idx}>
          <div className="user-profile-pic"></div>
          <div className="message-content">
            <div className="message-author-timestamp">
              <div className="message-author-name"><strong>{message.authorName}</strong></div>
              <div className="message-timestamp">{timeStamp}</div>
            </div>

            <div className="message-body">
              {message.body}
            </div>
          </div>
        </li>
      );
    });

    return messages;
  }

  render() {
    const channel = this.props.currentChannel;
    const memberCount = this.props.memberCount;
    const purpose = this.props.purpose;
    let activeButton;
    if (this.props.channelSettingsMenuShown) {
      activeButton = "activeButton";
    }

    if (channel) {
      return (
        <div id="channel-messages">
          {this.settingsMenu()}

          <div className="channel-messages-header" onClick={this.hideAllMenus}>
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
              <div className={`channel-settings ${activeButton}`} onClick={this.toggleChannelSettingsMenu}>
                <i className="fas fa-cog"></i>
              </div>
            </div>
          </div>

          <div className="messages" onClick={this.hideAllMenus}>
            <div className="messages-root-container">
              <div id="new-message-banner-container" className={this.state.newMessageBannerShown} onClick={this.scrollToBottom}>
                {this.renderNewMessageBanner()}
              </div>

              <div id="messages-container">
                <ul>
                  {this.renderMessages()}
                  <div id="scroll-identifier"></div>
                </ul>
              </div>
            </div>

            <Route path='/messages' component={ChannelDetailContainer}></Route>
          </div>

          <div className="message-input">
            <div className="message-input-container">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  value={this.state.body}
                  placeholder={`Message #${channel.name}`}
                  onChange={this.handleChange("body")}
                />
              </form>
            </div>
          </div>

          {this.joinChannelFooter(channel)}
        </div>
      );
    } else if (this.props.location.pathname === "/messages" || this.props.location.pathname === "/messages/") {
      return (
        this.renderBlankChannel()
      );
    } else {
      return null;
    }
  }
}

export default ChannelMessages;
