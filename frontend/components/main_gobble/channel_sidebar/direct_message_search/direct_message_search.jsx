import React from "react";

class DirectMessageSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      criteria: ""
    };
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  render() {
    if (this.props.userSearchMenuShown) {
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
    } else {
      return null;
    }
  }
}

export default DirectMessageSearch;
