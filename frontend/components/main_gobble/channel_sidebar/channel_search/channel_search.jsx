import React from 'react';

class ChannelSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="channel-search">
        <div className="channel-search-container">
          <div className="search-header">Browse channels</div>
          <div className="channel-search-bar">
            <input type="text" placeholder="Search channels" />
          </div>

          <div className="channel-search-list">

          </div>
        </div>
      </div>
    );
  }
}

export default ChannelSearch;
