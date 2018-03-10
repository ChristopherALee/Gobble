import React from "react";

class DirectMessages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="direct-messages-container">
        <div className="direct-messages-header">
          <div className="direct-messages-header-left">header left</div>
          <div className="direct-messages-header-right">header right</div>
        </div>

        <div className="direct-messages">
          <div className="direct-messages-root-container">
            <div className="direct-messages">messages</div>
            <div className="message-input">input</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DirectMessages;
