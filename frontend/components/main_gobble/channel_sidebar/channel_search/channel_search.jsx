import React from 'react';

class ChannelSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const removeChannelSearchMenu = this.props.removeChannelSearchMenu;

    if (this.props.channelSearchMenuShown) {
      return (
        <div id="channel-search">
          <div className="channel-search-container">
            <div className="close-channel-search-menu" onClick={removeChannelSearchMenu}>
              <i className="fas fa-times"></i>
              <p>esc</p>
            </div>

            <div className="search-header">Browse channels</div>

            <div className="channel-search-bar">
              <input type="text" placeholder="Search channels" />
            </div>

            <div className="channel-search-list">

            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ChannelSearch;
