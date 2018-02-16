import React from 'react';

class CreateChannelForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      purpose: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  activeSubmit() {
    if (this.state.name.length && !this.isErrors()) {
      return 'green-submit';
    } else {
      return null;
    }
  }

  isErrors() {
    if (
      this.state.name.length >= 22
      || this.state.name !== this.state.name.toLowerCase()
      || this.state.name.includes(' ')
      || this.state.name.includes('.')
      || this.state.name.includes('?')
    ) {
      return 'channel-input-errors';
    } else {
      return null;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.activeSubmit()) {
      const channel = Object.assign({}, this.state);
      this.props.createChannel({channel: channel}).then(
        (success) => {
          this.props.createMembership({membership: {channel_id: success.id}});
          this.props.removeCreateChannelMenu();
          this.setState({
            ['name']: '',
            ['purpose']: ''
          });
        }
      );
    }
  }

  render() {
    if (this.props.createChannelMenuShown) {
      return (
        <div className="create-channel-menu">
          <div className="close-create-channel-menu" onClick={this.props.removeCreateChannelMenu}>
            <i className="fas fa-times"></i>
            <p>esc</p>
          </div>
          <div className="create-channel-menu-container">
            <div className="create-channel-menu-contents">
              <h1>Create a channel</h1>
              <p className="create-channel-description">Channels are where your members communicate. They're best when organized around a topic - #bread, for example.</p>

              <form className="create-channel-form">
                <div className="channel-form-input">
                  <p>Name</p>
                  <div className={`${this.isErrors()} channel-input-container`}>
                    <p className="hashtag">#</p>
                    <input
                      type="text"
                      value={this.state.name}
                      onChange={this.handleChange("name")}
                      className="create-channel-form-name-input"/>
                  </div>
                  <span>Names must be lowercase, without spaces or periods, and shorter than 22 characters.</span>
                </div>
                <div className="channel-form-input">
                  <div className="purpose-container">
                    <p>Purpose</p>
                    <p id="italic">(optional)</p>
                  </div>
                  <div className="channel-input-container">
                    <input
                      type="text"
                      value={this.state.purpose}
                      onChange={this.handleChange("purpose")}
                      className="create-channel-form-purpose-input"/>
                  </div>
                  <span>What's this channel about?</span>
                </div>

                <div className="create-channel-submit-button-container">
                  <input
                    type="submit"
                    id={`${this.activeSubmit()}`}
                    onClick={this.handleSubmit}
                    value="Create Channel"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CreateChannelForm;
