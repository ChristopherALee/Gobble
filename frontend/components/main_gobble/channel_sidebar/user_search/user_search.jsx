import React from "react";

class UserSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      criteria: ""
    };
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  render() {
    return (
      <div id="dm-user-search">
        <section className="close-channel-search-menu">
          <i className="fas fa-times" />
          <p>esc</p>
        </section>

        <section className="user-search-section">
          <div className="user-search-header">
            <h1>Direct Messages</h1>
          </div>

          <div className="user-search-bar">
            <i className="fas fa-search" />
            <input
              type="text"
              placeholder="Find or start a conversation"
              onChange={this.handleChange("criteria")}
            />
          </div>
        </section>

        <section className="user-list">
          <p>user list</p>
        </section>
      </div>
    );
  }
}

export default UserSearch;
