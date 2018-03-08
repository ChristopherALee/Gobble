import React from "react";
import { Link } from "react-router-dom";

class DirectMessageSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      criteria: "",
      selectedUsers: new Set()
    };

    this.renderUsers = this.renderUsers.bind(this);
    this.renderSelectedUsers = this.renderSelectedUsers.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.deSelectUser = this.deSelectUser.bind(this);
    this.closeReset = this.closeReset.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  closeReset() {
    this.setState({
      criteria: "",
      selectedUsers: new Set()
    });
    this.props.hideDirectMessageMenu();
  }

  selectUser(user) {
    return e => {
      let newState = Object.assign({}, this.state);
      newState.selectedUsers.add(user);
      this.setState(newState);
      this.setState({ ["criteria"]: "" });
    };
  }

  deSelectUser(user) {
    return e => {
      let newState = Object.assign({}, this.state);
      newState.selectedUsers.delete(user);
      this.setState(newState);
    };
  }

  renderUsers() {
    let users = this.props.users;
    let criteria = this.state.criteria;
    let currentUser = this.props.currentUser.username;
    let that = this;
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
        if (
          user.username.toLowerCase().includes(criteria.toLowerCase()) &&
          !that.state.selectedUsers.has(user)
        ) {
          return (
            <li key={user.id} onClick={this.selectUser(user)}>
              <div className="search-user-item-container">
                <p>{user.username}</p>
              </div>

              <i className="fas fa-reply" />
            </li>
          );
        } else {
          return null;
        }
      });

    return (
      <div className="user-list">
        <ul>{users}</ul>
      </div>
    );
  }

  renderSelectedUsers() {
    return Array.from(this.state.selectedUsers).map(user => {
      return (
        <div className="selected-user-item" key={user.id}>
          <p className="selected-user-username">{user.username}</p>
          <p
            className="remove-selected-user-button"
            onClick={this.deSelectUser(user)}
          >
            X
          </p>
        </div>
      );
    });
  }

  render() {
    if (this.props.directMessageMenuShown) {
      return (
        <div id="dm-user-search">
          <section
            className="close-channel-search-menu"
            onClick={this.closeReset}
          >
            <i className="fas fa-times" />
            <p>esc</p>
          </section>

          <section className="user-search-section">
            <div className="user-search-container">
              <div className="user-search-header">
                <h1>Direct Messages</h1>
              </div>

              <div className="user-search-bar-container">
                <div className="user-search-bar">
                  <div className="search-user-added">
                    {this.renderSelectedUsers()}
                  </div>

                  <div className="search-bar-container">
                    <i className="fas fa-search" />
                    <input
                      type="text"
                      placeholder="Find or start a conversation"
                      onChange={this.handleChange("criteria")}
                      value={this.state.criteria}
                    />
                  </div>
                </div>

                <div className="direct-message-go-button">
                  <p>Go</p>
                </div>
              </div>

              <p className="user-list-header">Add users to direct message</p>
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
