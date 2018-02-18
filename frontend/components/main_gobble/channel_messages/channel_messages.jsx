import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ChannelMessages extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const channel = this.props.currentChannel;
    const memberCount = this.props.memberCount;
    const purpose = this.props.purpose;
    
    if (channel) {
      return (
        <div id="channel-messages">
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
              <i className="fas fa-cog"></i>
            </div>
          </div>

        </div>
      );
    } else {
      return null;
    }
  }
}

export default ChannelMessages;
