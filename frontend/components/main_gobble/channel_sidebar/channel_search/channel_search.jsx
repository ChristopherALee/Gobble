import React from 'react';

class ChannelSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      criteria: ""
    };

    this.removeChannelSearchMenu = this.removeChannelSearchMenu.bind(this);
    this.renderSearchedChannels = this.renderSearchedChannels.bind(this);
  }

  removeChannelSearchMenu() {
    this.props.removeChannelSearchMenu();
  }

  handleChange(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  renderSearchedChannels() {
    const allChannels = this.props.allChannels;
    let criteria = this.state.criteria;
    let searchedChannels = allChannels.filter((channel) => {
      return (
        channel.name.includes(criteria)
      );
    });

    const dateTimeConversion = (dateTime) => {
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

      return (
        `${month} ${day}, ${year}`
      );
    };

    return searchedChannels.map( (channel, idx) => {
      let memberCount = channel.members.length;

      return (
        <li key={idx}>
          <div className="search-channel-item-left">
            <p className="hashtag">#</p>
            <div className="search-channel-item-contents">
              <div className="search-channel-item-name">
                <p>
                  {channel.name}
                </p>
                <div className="search-channel-item-right">
                  <i className="far fa-user"></i>
                  <div className="search-channel-item-member-ct">{memberCount}</div>
                </div>
              </div>
              <p className="search-channel-item-purpose">{channel.purpose}</p>
              <p className="search-channel-item-created">
                Created by {channel.creatorName} on {dateTimeConversion(channel.created_at)}
              </p>
            </div>
          </div>

        </li>
      );
    });
  }

  render() {
    if (this.props.channelSearchMenuShown) {
      return (
        <div id="channel-search">
          <div className="close-channel-search-menu" onClick={this.removeChannelSearchMenu}>
            <i className="fas fa-times"></i>
            <p>esc</p>
          </div>

          <section className="channel-search-section">

            <div className="channel-search-container">
              <div className="search-header">
                <h1>Browse channels</h1>
                <div className="channel-search-create-channel-button">Create Channel</div>
              </div>
              <div className="channel-search-bar">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search channels"
                  onChange={this.handleChange("criteria")}
                 />
              </div>

              <div className="channel-search-list">
                <ul>
                  {this.renderSearchedChannels()}
                </ul>
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

export default ChannelSearch;
