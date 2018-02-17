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
          <div className="close-channel-search-menu" onClick={removeChannelSearchMenu}>
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
                <input type="text" placeholder="Search channels" />
              </div>

              <div className="channel-search-list">

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
