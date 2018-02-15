import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ChannelMessages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const channelName = this.props.currentChannel;
    const memberCount = this.props.memberCount;
    const purpose = this.props.purpose;

    return (
      <div id="channel-messages">
        <div className="channel-messages-header">
          <div className="channel-messages-header-left">
            <div className="channel-messages-title">#{channelName}</div>
            <div className="channel-details">
              <div className="channel-detail-member-ct">{memberCount}</div>
              <div className="channel-detail-purpose">{purpose}</div>
            </div>
          </div>

          <div className="channel-messages-header-right">
            search
          </div>
        </div>

      </div>
    );
  }
}

export default ChannelMessages;
