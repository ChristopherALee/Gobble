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

    if (this.state.criteria !== "") {
      return searchedChannels.map( (channel, idx) => {
        return (
          <li key={idx}>
            {channel.name}
          </li>
        );
      });
    } else {
      return null;
    }
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
