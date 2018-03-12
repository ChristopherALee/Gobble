import React from "react";

class DirectMessages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      newMessages: false,
      newMessageBannerShown: "hidden",
      channelDetailShown: false,
      currentUserMessaged: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDmChannelMessages = this.getDmChannelMessages.bind(this);

    this.renderMessages = this.renderMessages.bind(this);
    this.dateTimeConversion = this.dateTimeConversion.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.hideAllMenus = this.hideAllMenus.bind(this);
  }

  componentDidMount() {
    let that = this;

    this.pusher = new Pusher("416ebb2d74bf61955f19", {
      cluster: "us2",
      encrypted: true
    });

    this.dmChannelMessages = this.pusher.subscribe("direct_messages");
    this.dmChannelMessages.bind("message_created", function(data) {
      that.getDmChannelMessages(data.directMessageChannelId);
    });
  }

  componentWillUnmount() {
    this.pusher.unsubscribe("direct_messages");
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
      this.setState({ ["newMessages"]: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (this.props.currentDmChannel) {
        document.getElementById("scroll-identifier").scrollIntoView({
          behavior: "instant"
        });
      }
    }
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const channel = this.props.currentDmChannel.name;

    this.props
      .createDirectMessage({
        direct_message: {
          body: this.state.body,
          direct_message_channel_id: this.props.currentDmChannel.id
        }
      })
      .then(success => {
        this.setState({ ["currentUserMessaged"]: true });
        this.setState({ ["body"]: "" });
        document.getElementById("scroll-identifier").scrollIntoView({
          behavior: "smooth"
        });
      });
  }

  getDmChannelMessages(channel) {
    if (this.state.currentUserMessaged && this.state.body === "") {
      document.getElementById("scroll-identifier").scrollIntoView({
        behavior: "smooth"
      });
    } else {
      this.props.fetchDirectMessageChannelMessages(channel).then(success => {
        const scrollHeight = document.getElementById("direct-messages-section")
          .scrollHeight;
        const scrollTop = document.getElementById("direct-messages-section")
          .scrollTop;
        const bottomHeight = scrollHeight - scrollTop;
        const containerHeight =
          document.getElementById("direct-messages-section").clientHeight + 500;

        if (
          this.state.body === "" &&
          bottomHeight > containerHeight &&
          !this.state.currentUserMessaged
        ) {
          this.setState({ ["newMessages"]: true });
          this.setState({ ["newMessageBannerShown"]: "shown" });
        } else if (this.state.body === "") {
          document.getElementById("scroll-identifier").scrollIntoView({
            behavior: "smooth"
          });
        }

        this.setState({ ["currentUserMessaged"]: false });
      });
    }
  }

  renderNewMessageBanner() {
    if (this.state.newMessages) {
      return (
        <div id="new-message-banner">
          <p>New messages (click here to scroll down)</p>
        </div>
      );
    } else {
      return null;
    }
  }

  scrollToBottom() {
    document.getElementById("scroll-identifier").scrollIntoView({
      behavior: "instant"
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
    let minutes = dateTime.slice(14, 16);
    let amOrPm;
    const hourInt = parseInt(dateTime.slice(11, 13));

    if (hourInt < 12) {
      amOrPm = "am";
      if (hourInt === 0) {
        hour = "12";
      } else if (hourInt < 10) {
        hour = dateTime.slice(12, 13);
      } else {
        hour = dateTime.slice(11, 13);
      }
    } else {
      amOrPm = "pm";
      if (hourInt === 12) {
        hour = String(hourInt);
      } else {
        hour = String(hourInt) - 12;
      }
    }

    return `${month} ${day}, ${year} at ${hour}:${minutes}${amOrPm}`;
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
        <li id={lastMessage} key={message.id}>
          <div className="user-profile-pic" />
          <div className="message-content">
            <div className="message-author-timestamp">
              <div className="message-author-name">
                <strong>{message.authorName}</strong>
              </div>
            </div>

            <div className="message-body">{message.body}</div>
          </div>
        </li>
      );
    });

    return messages;
  }

  hideAllMenus() {
    if (this.props.gobbleMenuShown) {
      this.props.hideMenu();
    }
  }

  render() {
    if (this.props.currentDmChannel && this.props.currentUser) {
      let currentUser = this.props.currentUser.username;
      let recipients = this.props.currentDmChannel.members.filter(
        member => member !== currentUser
      );
      if (recipients.length > 1) {
        recipients = recipients.join(", ");
      } else {
        recipients = recipients.join("");
      }

      return (
        <div id="direct-messages-container" onClick={this.hideAllMenus}>
          <section id="direct-messages-header">
            <div className="direct-messages-header-left">
              <div className="direct-message-recipients">{recipients}</div>
              <div className="direct-message-recipient-status">
                <div className="active-circle" />
                <p>Online</p>
              </div>
            </div>
          </section>

          <section id="direct-messages">
            <div className="direct-messages-root-container">
              <div
                id="new-message-banner-container"
                className={this.state.newMessageBannerShown}
                onClick={this.scrollToBottom}
              >
                {this.renderNewMessageBanner()}
              </div>
              <div id="direct-messages-section">
                <ul>
                  {this.renderMessages()}
                  <div id="scroll-identifier" />
                </ul>
              </div>
              <div className="message-input">
                <div className="message-input-container">
                  <form onSubmit={this.handleSubmit}>
                    <input
                      type="text"
                      value={this.state.body}
                      placeholder={`Message ${recipients}`}
                      onChange={this.handleChange("body")}
                    />
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default DirectMessages;
