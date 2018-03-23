import React from "react";

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // if (this.props.loading) {
    return (
      <div id="loading-screen">
        <section className="loading-sidebar">
          <div className="loading-sidebar-container">
            <div className="loading-header">
              <div className="loading-title" />
              <div className="loading-username" />
            </div>

            <div className="loading-channel-list-container">
              <div className="loading-channel-header" />
              <ul className="loading-channel-list">
                <li className="loading-channel-list-item" />
                <li className="loading-channel-list-item3" />
                <li className="loading-channel-list-item2" />
                <li className="loading-channel-list-item2" />
                <li className="loading-channel-list-item3" />
              </ul>
            </div>

            <div className="loading-channel-list-container">
              <div className="loading-channel-header" />
              <ul className="loading-channel-list">
                <li className="loading-channel-list-item2" />
                <li className="loading-channel-list-item" />
                <li className="loading-channel-list-item3" />
                <li className="loading-channel-list-item2" />
                <li className="loading-channel-list-item" />
                <li className="loading-channel-list-item2" />
                <li className="loading-channel-list-item" />
              </ul>
            </div>
          </div>
        </section>

        <section className="loading-messages">
          <div className="loading-messages-header">
            <div className="loading-messages-header-left">
              <div className="loading-messages-header-title" />
              <div className="loading-messages-header-description" />
            </div>

            <div className="loading-messages-header-right">
              <div className="loading-messages-header-right-item1" />
              <div className="loading-messages-header-right-item2" />
              <div className="loading-messages-header-right-item1" />
              <div className="loading-messages-header-right-item1" />
              <div className="loading-messages-header-right-item1" />
            </div>
          </div>

          <div className="loading-container">
            <div className="loading-content">
              <div id="loading-duck" />
              <div className="loading-text">
                <p className="loading-quote">You're deth-picable!</p>
                <p className="loading-quote-author">- Daffy Duck</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  // else {
  //   return null;
  // }
  // }
}

export default Loading;
