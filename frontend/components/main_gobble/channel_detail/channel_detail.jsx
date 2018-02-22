import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ChannelDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const currentChannel = this.props.currentChannel;
    const currentChannelMembers = this.props.currentChannelMembers;

    if (currentChannel && currentChannelMembers) {
      return (
        <div id="channel-detail">
          <div className="channel-detail-container">
            <div className="channel-detail-about-banner">
              <p><strong>About #{currentChannel.name}</strong></p>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ChannelDetail;
