import React from "react";

class DirectMessages extends React.Component {
  constructor(props) {
    super(props);
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
        <div id="direct-messages-container">
          <section className="direct-messages-header">
            <div className="direct-messages-header-left">
              <div className="direct-message-recipients">{recipients}</div>
              <div className="direct-message-recipient-status">
                <div className="active-circle" />
                <p>Online</p>
              </div>
            </div>
            <div className="direct-messages-header-right">header right</div>
          </section>

          <section className="direct-messages">
            <div className="direct-messages-root-container">
              <div className="direct-messages">messages</div>
              <div className="message-input">input</div>
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
