import React from "react";
import { Link } from "react-router-dom";

class DirectMessageSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      criteria: ""
    };

    this.renderUsers = this.renderUsers.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  renderUsers() {
    let users = this.props.users;
    let criteria = this.state.criteria;
    let currentUser = this.props.currentUser.username;

    users = users
      .filter(user => user.username !== currentUser)
      .sort((a, b) => {
        let userA = a.username;
        let userB = b.username;

        if (userA < userB) {
          return -1;
        } else if (userA > userB) {
          return 1;
        } else {
          return 0;
        }
      })
      .map(user => {
        return (
          <li>
            <div className="search-user-item-container">
              <p>{user.username}</p>
            </div>
          </li>
        );
      });

    return (
      <div className="user-list">
        <ul>{users}</ul>
      </div>
    );
  }

  render() {
    if (this.props.directMessageMenuShown) {
      return (
        <div id="dm-user-search">
          <section
            className="close-channel-search-menu"
            onClick={this.props.hideDirectMessageMenu}
          >
            <i className="fas fa-times" />
            <p>esc</p>
          </section>

          <section className="user-search-section">
            <div className="user-search-container">
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

              {this.renderUsers()}
            </div>
          </section>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default DirectMessageSearch;
