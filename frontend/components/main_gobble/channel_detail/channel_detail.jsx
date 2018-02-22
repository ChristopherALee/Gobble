import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ChannelDetail extends React.Component {
  constructor(props) {
    super(props);

    this.dateTimeConversion = this.dateTimeConversion.bind(this);
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
      `${month} ${day}, ${year}`
    );
  }

  render() {
    const currentChannel = this.props.currentChannel;
    const currentChannelMembers = this.props.currentChannelMembers;

    if (currentChannel && currentChannelMembers) {
      return (
        <div id="channel-detail">
          <div className="channel-detail-container">
            <section className="channel-detail-about-banner">
              <h2>About #{currentChannel.name}</h2>
            </section>

            <section className="channel-details-content-container">
              <div className="channel-details-content-header">
                <p>Channel Details</p>
              </div>

              <div className="channel-details-content">
                <h3>Purpose</h3>
                <p>{currentChannel.purpose}</p>

                <h3>Created</h3>
                <p>Created by {currentChannel.creatorName} on {this.dateTimeConversion(currentChannel.created_at)}</p>
              </div>
            </section>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ChannelDetail;
