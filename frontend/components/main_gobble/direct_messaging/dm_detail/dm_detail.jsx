import React from "react";
import { Link, withRouter } from "react-router-dom";

class DirectMessageDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      members: "expanded"
    };

    this.dateTimeConversion = this.dateTimeConversion.bind(this);
    this.toggleExpand = this.toggleExpand.bind(this);
    this.renderChannelMembers = this.renderChannelMembers.bind(this);
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
      hour = dateTime.slice(12, 13);
      minutes = dateTime.slice(14, 16);
      amOrPm = "am";
    } else {
      hour = String(parseInt(dateTime.slice(11, 13)) - 12);
      minutes = dateTime.slice(14, 16);
      amOrPm = "pm";
    }

    return `${month} ${day}, ${year}`;
  }

  toggleExpand(section) {
    return e => {
      e.preventDefault();
      if (this.state[section] === "collapsed") {
        this.setState({ [section]: "expanded" });
      } else {
        this.setState({ [section]: "collapsed" });
      }
    };
  }

  toggleExpandIcon(section) {
    if (this.state[section] === "expanded") {
      return "triangle-down";
    } else {
      return "triangle-right";
    }
  }

  renderChannelMembers() {
    const currentUser = this.props.currentUser;
    const currentDmChannelMembers = this.props.currentDmChannelMembers.sort(
      (a, b) => {
        let memberA = a.username;
        let memberB = b.username;

        if (memberA < memberB) {
          return -1;
        } else if (memberA > memberB) {
          return 1;
        } else {
          return 0;
        }
      }
    );

    return currentDmChannelMembers.map(member => {
      if (member.username === currentUser.username) {
        return (
          <li key={member.id}>
            <div className="channel-member-status" />
            <div className="channel-member-picture" />
            <div className="channel-member-username">
              {member.username}{" "}
              <p className="channel-member-currentUser">(you)</p>
            </div>
          </li>
        );
      } else {
        return (
          <li key={member.id}>
            <div className="channel-member-status" />
            <div className="channel-member-picture" />
            <div className="channel-member-username">{member.username}</div>
          </li>
        );
      }
    });
  }

  render() {
    const currentDmChannel = this.props.currentDmChannel;
    const currentDmChannelMembers = this.props.currentDmChannelMembers;

    if (currentDmChannel && currentDmChannelMembers) {
      return (
        <div id="channel-detail">
          <div className="channel-detail-container">
            <section className="channel-detail-about-banner">
              <h2>About this conversation</h2>
              <p>X</p>
            </section>

            <section
              className={`channel-members-content-container ${
                this.state.members
              }`}
            >
              <div
                className="channel-members-content-header"
                onClick={this.toggleExpand("members")}
              >
                <div className="channel-members-content-header-left">
                  <i className="far fa-user" />
                  <p>{this.props.currentDmChannelMembers.length} Members</p>
                </div>

                <div className="channel-members-content-header-right">
                  <div
                    className={`channel-detail-triangle ${this.toggleExpandIcon(
                      "members"
                    )}`}
                  />
                </div>
              </div>

              <div className="channel-members-content">
                <ul>{this.renderChannelMembers()}</ul>
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

export default DirectMessageDetail;
