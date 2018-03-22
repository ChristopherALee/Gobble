import React from "react";

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading) {
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
            <div className="loading-container">
              <div id="loading-duck" />
              <p className="loading-text">
                Quack quack (loading) quack quack...
              </p>
            </div>
          </section>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Loading;
