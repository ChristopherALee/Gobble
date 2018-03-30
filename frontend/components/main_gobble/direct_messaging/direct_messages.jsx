import React from "react";
import { Route } from "react-router-dom";
import DirectMessageDetailContainer from "./dm_detail/dm_detail_container";

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
    this.memberOnlineStatus = this.memberOnlineStatus.bind(this);

    this.renderMessages = this.renderMessages.bind(this);
    this.dateTimeConversion = this.dateTimeConversion.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.hideAllMenus = this.hideAllMenus.bind(this);
    this.toggleChannelDetail = this.toggleChannelDetail.bind(this);
    this.renderChannelDetail = this.renderChannelDetail.bind(this);
  }

  componentDidMount() {
    let that = this;

    if (this.props.currentDmChannel) {
      let members = this.props.currentDmChannel.members.filter(member => {
        return member !== this.props.currentUser.username;
      });

      for (let i = 0; i < members.length; i++) {
        this.props.fetchSingleUser(members[i]);
      }
    }

    this.pusher = new Pusher("416ebb2d74bf61955f19", {
      cluster: "us2",
      encrypted: true
    });

    this.dmChannelMessages = this.pusher.subscribe("direct_messages");
    this.dmChannelMessages.bind("message_created", function(data) {
      that.getDmChannelMessages(data.directMessageChannelId);
    });

    this.userPresence = this.pusher.subscribe("user_presence");
    this.userPresence.bind("user_online", function(data) {
      that.props.fetchSingleUser(data.user.username);
    });
  }

  componentWillUnmount() {
    this.pusher.unsubscribe("direct_messages");
    this.pusher.unsubscribe("user_presence");
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
      this.setState({ ["newMessages"]: false });
      this.setState({ ["body"]: "" });

      if (newProps.currentDmChannel) {
        let members = newProps.currentDmChannel.members.filter(member => {
          return member !== newProps.currentUser.username;
        });

        for (let i = 0; i < members.length; i++) {
          newProps.fetchSingleUser(members[i]);
        }
      }
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

  formatMessage(message) {
    let regex = /(?=[*~^ ])/g;
    let formattedMessage = message.body.split(regex);

    let final = [];
    let currentFormat = null;
    let isBlockQuote = false;
    let formatted = [];
    formattedMessage.forEach((chars, idx) => {
      if (chars.includes("*")) {
        if (currentFormat === "*") {
          formatted.push(chars);
          final.push(formatted.join(""));
          formatted = [];
          currentFormat = null;
        } else {
          currentFormat = "*";
          formatted.push(chars);
        }
      } else if (chars.includes("^")) {
        if (currentFormat === "^") {
          formatted.push(chars);
          final.push(formatted.join(""));
          formatted = [];
          currentFormat = null;
        } else {
          currentFormat = "^";
          formatted.push(chars);
        }
      } else if (chars.includes("~")) {
        if (currentFormat === "~") {
          formatted.push(chars);
          final.push(formatted.join(""));
          formatted = [];
          currentFormat = null;
        } else {
          currentFormat = "~";
          formatted.push(chars);
        }
      } else if (chars.includes("```")) {
        if (
          chars[0] + chars[1] + chars[2] === "```" &&
          chars[chars.length - 1] +
            chars[chars.length - 2] +
            chars[chars.length - 3] ===
            "```"
        ) {
          formatted.push(chars);
          final.push(formatted.join(""));
          formatted = [];
          currentFormat = null;
        } else if (currentFormat === "```") {
          formatted.push(chars);
          final.push(formatted.join(""));
          formatted = [];
          currentFormat = null;
        } else {
          currentFormat = "```";
          formatted.push(chars);
        }
      } else if (chars.includes("`")) {
        if (
          (chars[0] === "`" || chars[1] === "`") &&
          chars[chars.length - 1] === "`"
        ) {
          formatted.push(chars);
          final.push(formatted.join(""));
          formatted = [];
          currentFormat = null;
        } else if (currentFormat === "`") {
          formatted.push(chars);
          final.push(formatted.join(""));
          formatted = [];
          currentFormat = null;
        } else {
          currentFormat = "`";
          formatted.push(chars);
        }
      } else if (chars.includes(">>>")) {
        // currentFormat = ">>>";
        isBlockQuote = true;
        // formatted.push(chars);
      } else if (
        isBlockQuote &&
        idx !== formattedMessage.length - 1 &&
        currentFormat !== null
      ) {
        formatted.push(chars);
      } else if (isBlockQuote && idx === formattedMessage.length - 1) {
        formatted.push(chars);
        final.push(formatted.join(" "));
        formatted = [];
        // currentFormat = null;
        final.join(" ");
      } else if (currentFormat === null) {
        formatted.push(chars);
        final.push(formatted.join(""));
        formatted = [];
        currentFormat = null;
      } else {
        formatted.push(chars);
      }
    });

    final.push(formatted.join(" "));
    formatted = [];
    currentFormat = null;

    const formattedFinal = final.map((formattedMessage, idx) => {
      if (
        formattedMessage.slice(0, 2) === "**" ||
        formattedMessage.slice(1, 3) === "**" ||
        (formattedMessage.slice(0, 2) === "^^" ||
          formattedMessage.slice(1, 3) === "^^") ||
        (formattedMessage.slice(0, 2) === "~~" ||
          formattedMessage.slice(1, 3) === "~~") ||
        (formattedMessage === "``" ||
          formattedMessage === " ``" ||
          (formattedMessage === "```" || formattedMessage === " ```"))
      ) {
        return <p key={idx}>{formattedMessage}</p>;
      } else if (formattedMessage[0] === "*") {
        return (
          <div key={idx} className="bold-message">
            {formattedMessage.slice(1, formattedMessage.length - 1)}
          </div>
        );
      } else if (formattedMessage[1] === "*") {
        return (
          <div key={idx} className="bold-message">
            {formattedMessage.slice(2, formattedMessage.length - 1)}
          </div>
        );
      } else if (formattedMessage[0] === "^") {
        return (
          <div key={idx} className="italics-message">
            {formattedMessage.slice(1, formattedMessage.length - 1)}
          </div>
        );
      } else if (formattedMessage[1] === "^") {
        return (
          <div key={idx} className="italics-message">
            {formattedMessage.slice(2, formattedMessage.length - 1)}
          </div>
        );
      } else if (formattedMessage[0] === "~") {
        return (
          <div key={idx} className="strikethrough-message">
            {formattedMessage.slice(1, formattedMessage.length - 1)}
          </div>
        );
      } else if (formattedMessage[1] === "~") {
        return (
          <div key={idx} className="strikethrough-message">
            {formattedMessage.slice(2, formattedMessage.length - 1)}
          </div>
        );
      } else if (
        formattedMessage[0] + formattedMessage[1] + formattedMessage[2] ===
        "```"
      ) {
        return (
          <div key={idx} className="multiline-block-message">
            {formattedMessage.slice(3, formattedMessage.length - 3)}
          </div>
        );
      } else if (
        formattedMessage[1] + formattedMessage[2] + formattedMessage[3] ===
        "```"
      ) {
        return (
          <div key={idx} className="multiline-block-message">
            {formattedMessage.slice(4, formattedMessage.length - 3)}
          </div>
        );
      } else if (formattedMessage[0] === "`") {
        return (
          <div key={idx} className="singleline-block-message">
            {formattedMessage.slice(1, formattedMessage.length - 1)}
          </div>
        );
      } else if (formattedMessage[1] === "`") {
        return (
          <div key={idx} className="singleline-block-message">
            {formattedMessage.slice(2, formattedMessage.length - 1)}
          </div>
        );
      } else if (
        formattedMessage[0] + formattedMessage[1] + formattedMessage[2] ===
        ">>>"
      ) {
        return (
          <div key={idx} className="blockquote-message">
            {formattedMessage.slice(3)}
          </div>
        );
      } else if (formattedMessage !== " ") {
        return <p key={idx}>{formattedMessage}</p>;
      }
    });

    if (isBlockQuote) {
      return <div className="blockquote-message">{formattedFinal}</div>;
    } else {
      return formattedFinal;
    }
  }

  formatYouTubeMessage(message) {
    const videoId = message.body.slice(32);
    const embeddedLink = `https://www.youtube.com/embed/${videoId}?controls=1`;

    return (
      <div className="youtube-video-message">
        <a href={message.body}>{message.body}</a>
        <iframe width="520" height="315" src={embeddedLink} />
      </div>
    );
  }

  processMessage(message) {
    let formattedCt = {
      "*": 0,
      "`": 0,
      "~": 0,
      "^": 0,
      ">": 0
    };
    for (let i = 0; i < message.body.length; i++) {
      if (message.body[i] === "*") {
        formattedCt["*"] += 1;
      } else if (message.body[i] === "`") {
        formattedCt["`"] += 1;
      } else if (message.body[i] === "~") {
        formattedCt["~"] += 1;
      } else if (message.body[i] === "^") {
        formattedCt["^"] += 1;
      } else if (message.body[i] === ">") {
        formattedCt[">"] += 1;
      }
    }

    let regularMessage, formattedMessage, youTubeMessage;
    if (message.body.includes("www.youtube.com/watch")) {
      youTubeMessage = this.formatYouTubeMessage(message);
    } else if (
      formattedCt["*"] > 1 ||
      formattedCt["`"] > 1 ||
      formattedCt["~"] > 1 ||
      formattedCt["^"] > 1 ||
      (message.body.includes(">>>") && formattedCt[">"] === 3)
    ) {
      formattedMessage = this.formatMessage(message);
    } else {
      regularMessage = message.body;
    }

    if (regularMessage) {
      return <div className="message-body">{regularMessage}</div>;
    } else if (formattedMessage) {
      return <div className="formatted-message-body">{formattedMessage}</div>;
    } else if (youTubeMessage) {
      return <div className="message-body">{youTubeMessage}</div>;
    }
  }

  renderMessages() {
    let messages = this.props.messages;

    messages = messages.map((message, idx) => {
      let timeStamp = this.dateTimeConversion(message.created_at);
      let lastMessage;

      if (idx === messages.length - 1) {
        lastMessage = "last-message";
      }

      let processedMessage = this.processMessage(message);

      return (
        <li id={lastMessage} key={idx}>
          <div className="user-profile-pic" />
          <div className="message-content">
            <div className="message-author-timestamp">
              <div className="message-author-name">
                <strong>{message.authorName}</strong>
              </div>
              <div className="message-timestamp">{timeStamp}</div>
            </div>

            {processedMessage}
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

  toggleChannelDetail() {
    if (this.state.channelDetailShown) {
      this.setState({ ["channelDetailShown"]: false });
    } else {
      this.setState({ ["channelDetailShown"]: true });
    }
  }

  renderChannelDetail() {
    if (this.state.channelDetailShown) {
      return (
        <Route path="/messages/dm" component={DirectMessageDetailContainer} />
      );
    } else {
      return null;
    }
  }

  memberOnlineStatus(totalMemberCount, members) {
    if (totalMemberCount > 2) {
      let onlineCount = 0;
      members.forEach(member => {
        if (member.isOnline) {
          onlineCount += 1;
        }
      });

      return (
        <div
          className="direct-message-recipient-status"
          onClick={this.toggleChannelDetail}
        >
          <p>
            {onlineCount}/{totalMemberCount} Online
          </p>
        </div>
      );
    } else {
      let recipient = members.filter(
        member => member.username !== this.props.currentUser.username
      );

      if (recipient.length && recipient[0].isOnline) {
        return (
          <div className="direct-message-recipient-status">
            <div className="online-circle" />
            <p>Online</p>
          </div>
        );
      } else {
        return (
          <div className="direct-message-recipient-status">
            <div className="offline-circle" />
            <p>Offline</p>
          </div>
        );
      }
    }
  }

  render() {
    if (
      this.props.currentDmChannel &&
      this.props.currentUser &&
      this.props.allUsers
    ) {
      let currentUser = this.props.currentUser.username;
      let membersFull = this.props.allUsers.filter(user => {
        return user.directMessageChannels.includes(
          this.props.currentDmChannel.id
        );
      });

      let recipients = this.props.currentDmChannel.members.filter(
        member => member !== currentUser
      );
      if (recipients.length > 1) {
        recipients = recipients.join(", ");
      } else {
        recipients = recipients.join("");
      }

      let activeDetailButton;
      if (this.state.channelDetailShown) {
        activeDetailButton = "activeButton";
      }

      return (
        <div id="direct-messages-container" onClick={this.hideAllMenus}>
          <section id="direct-messages-header">
            <div className="direct-messages-header-left">
              <div className="direct-message-recipients">{recipients}</div>
              {this.memberOnlineStatus(this.props.memberCount, membersFull)}
            </div>

            <div className="direct-messages-header-right">
              <div
                className={`channel-detail-button ${activeDetailButton}`}
                onClick={this.toggleChannelDetail}
              >
                <i className="fas fa-info-circle" />
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

                <div className="message-formatting-description">
                  <div className="bold-format-template">*bold*</div>
                  <div className="italics-format-template">^italics^</div>
                  <div className="strike-format-template">~strike~</div>
                  <div className="code-format-template">`code`</div>
                  <div className="preformatted-format-template">
                    ```preformatted```
                  </div>
                  <div className="quote-format-template">>>>quote</div>
                </div>
              </div>
            </div>

            {this.renderChannelDetail()}
          </section>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default DirectMessages;
