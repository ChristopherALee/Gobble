import React from "react";
import { Link } from "react-router-dom";

class ChannelSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      criteria: ""
    };

    this.showCreateChannelMenu = this.showCreateChannelMenu.bind(this);
    this.closeReset = this.closeReset.bind(this);
    this.renderAllChannels = this.renderAllChannels.bind(this);
    this.dateTimeConversion = this.dateTimeConversion.bind(this);
  }

  closeReset() {
    this.setState({
      criteria: ""
    });
    this.props.removeChannelSearchMenu();
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
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

    return `${month} ${day}, ${year}`;
  }

  renderAllChannels() {
    const allChannels = this.props.allChannels;
    let criteria = this.state.criteria;
    let currentUser = this.props.currentUser.username;

    let notBelongedChannels = allChannels.filter(channel => {
      return (
        channel.name.includes(criteria) &&
        !channel.members.includes(currentUser)
      );
    });

    let belongedChannels = allChannels.filter(channel => {
      return (
        channel.name.includes(criteria) && channel.members.includes(currentUser)
      );
    });

    notBelongedChannels = notBelongedChannels.sort((a, b) => {
      let channelName1 = a.name;
      let channelName2 = b.name;

      if (channelName1 < channelName2) {
        return -1;
      } else if (channelName1 > channelName2) {
        return 1;
      } else {
        return 0;
      }
    });

    let searchedNotBelongedChannels = notBelongedChannels.map(
      (channel, idx) => {
        let memberCount = channel.members.length;

        return (
          <Link
            to={`/messages/${channel.name}`}
            key={idx}
            onClick={this.closeReset}
          >
            <li>
              <div className="search-channel-item-left">
                <div className="search-channel-item-container">
                  <p className="hashtag">#</p>
                  <div className="search-channel-item-contents">
                    <div className="search-channel-item-name">
                      <p>{channel.name}</p>
                      <div className="search-channel-item-right">
                        <i className="far fa-user" />
                        <div className="search-channel-item-member-ct">
                          {memberCount}
                        </div>
                      </div>
                    </div>
                    <p className="search-channel-item-purpose">
                      {channel.purpose}
                    </p>
                    <p className="search-channel-item-created">
                      Created by <strong>{channel.creatorName}</strong> on{" "}
                      {this.dateTimeConversion(channel.created_at)}
                    </p>
                  </div>
                </div>

                <i className="fas fa-reply" />
              </div>
            </li>
          </Link>
        );
      }
    );

    belongedChannels = belongedChannels.sort((a, b) => {
      let channelName1 = a.name;
      let channelName2 = b.name;

      if (channelName1 < channelName2) {
        return -1;
      } else if (channelName1 > channelName2) {
        return 1;
      } else {
        return 0;
      }
    });

    let searchedBelongedChannels = belongedChannels.map((channel, idx) => {
      let memberCount = channel.members.length;

      return (
        <Link
          to={`/messages/${channel.name}`}
          key={idx}
          onClick={this.closeReset}
        >
          <li>
            <div className="search-channel-item-left">
              <div className="search-channel-item-container">
                <p className="hashtag">#</p>
                <div className="search-channel-item-contents">
                  <div className="search-channel-item-name">
                    <p>{channel.name}</p>
                    <div className="search-channel-item-right">
                      <i className="far fa-user" />
                      <div className="search-channel-item-member-ct">
                        {memberCount}
                      </div>
                    </div>
                  </div>
                  <p className="search-channel-item-purpose">
                    {channel.purpose}
                  </p>
                  <p className="search-channel-item-created">
                    Created by <strong>{channel.creatorName}</strong> on{" "}
                    {this.dateTimeConversion(channel.created_at)}
                  </p>
                </div>
              </div>

              <i className="fas fa-reply" />
            </div>
          </li>
        </Link>
      );
    });

    return (
      <div className="channel-lists">
        <h2>Channels you can join</h2>
        <div className="channel-join">
          <ul>{searchedNotBelongedChannels}</ul>
        </div>

        <h2>Channels you belong to</h2>
        <div className="channel-belonged">
          <ul>{searchedBelongedChannels}</ul>
        </div>
      </div>
    );
  }

  showCreateChannelMenu() {
    this.props.renderCreateChannelMenu();
  }

  render() {
    if (this.props.channelSearchMenuShown) {
      return (
        <div id="channel-search">
          <div className="close-channel-search-menu" onClick={this.closeReset}>
            <i className="fas fa-times" />
            <p>esc</p>
          </div>

          <section className="channel-search-section">
            <div className="channel-search-container">
              <div className="search-header">
                <h1>Browse channels</h1>
                <div
                  className="channel-search-create-channel-button"
                  onClick={this.showCreateChannelMenu}
                >
                  Create Channel
                </div>
              </div>
              <div className="channel-search-bar">
                <i className="fas fa-search" />
                <input
                  type="text"
                  placeholder="Search channels"
                  onChange={this.handleChange("criteria")}
                />
              </div>

              {this.renderAllChannels()}
            </div>
          </section>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ChannelSearch;
