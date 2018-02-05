import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Typed from 'typed.js';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      usernameValidInput: "valid",
      passwordValidInput: "valid"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteErrors = this.deleteErrors.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.demoLoginButton = this.demoLoginButton.bind(this);
  }

  componentWillUnmount() {
    this.setState({['validInput']: 'valid'});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/feed');
    } else {
      this.setState({['usernameValidInput']: 'valid'});
      this.setState({['passwordValidInput']: 'valid'});
    }
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    let that = this;
    this.props.processForm(user).then(
      success => {

      }
    ).fail(
      error => {
        if (error.responseJSON.username) {
          this.setState({['usernameValidInput']: 'invalid'});
        } else {
          this.setState({['usernameValidInput']: 'valid'});
        }

        if (error.responseJSON.password) {
          this.setState({['passwordValidInput']: 'invalid'});
        } else {
          this.setState({['passwordValidInput']: 'valid'});
        }
      }
    );
  }

  deleteErrors() {
    this.props.deleteAllErrors();
  }

  renderUsernameErrors() {
    let usernameErrors;

    if (this.props.errors instanceof Array) {
      return null;
    } else if (this.props.errors.username) {
      usernameErrors = this.props.errors.username.map( (error, idx) => {
        return (
          <li key={`${idx}`}>
            {error}
          </li>
        );
      });
    }

    return (
      <ul>
        {usernameErrors}
      </ul>
    );
  }

  renderPasswordErrors() {
    let passwordErrors;

    if (this.props.errors instanceof Array) {
      return null;
    } else if (this.props.errors.password) {
      passwordErrors = this.props.errors.password.map( (error, idx) => {
        return (
          <li key={`${idx}`}>
            {error}
          </li>
        );
      });
    }

    return (
      <ul>
        {passwordErrors}
      </ul>
    );
  }

  demoLogin(e) {
    e.preventDefault();
    if (this.props.location.pathname === '/signup') {
      this.props.history.push('/login');
    }

    const login = this;

    this.state = {
      username: '',
      password: '',
      usernameValidInput: "valid",
      passwordValidInput: "valid"
    };

    const guest = { username: 'guest', password: 'password123' };
    const username = {
      strings: [guest.username],
      typeSpeed: 30
    };
    const password = {
      strings: [guest.password],
      typeSpeed: 30
    };

    this.setState({
      typeUsername: setTimeout(() => {
        new Typed('.session-form-username-input', username);
      }, 50),
      typePassword: setTimeout(() => {
        new Typed('.session-form-password-input', password);
      }, 400),
      typeSubmit: setTimeout(() => {
        login.props.login(guest);
      }, 1000)
    });
  }

  demoLoginButton() {
    return (
      <a href='#' className='demo-login' onClick={this.demoLogin}>Demo Log In</a>
    );
  }

  demoLoginButtonOnSignUp() {
    return (
      <a href='#' className='demo-login' onClick={this.demoLogin}>Demo Log In</a>
    );
  }

  render() {
    const processFormText = this.props.formType === 'signup' ? 'Join' : 'Log In to';
    const altProcessFormText = this.props.formType === 'signup' ? 'Log In' : 'Sign Up';
    const buttonText = this.props.formType === 'signup' ? 'Sign Up' : 'Log In';

    let link;
    let altText;
    if (this.props.formType === 'signup') {
      link = '/login';
      altText = 'Already have an account? ';
    } else {
      link = '/signup';
     altText = "Don't have an account? ";
    }

    return (
      <div id='session-form'>

      <div className='session-form-contents'>
        <p>{processFormText} Gobble</p>

        <div className='session-errors'>
          {/* {this.renderErrors()} */}
        </div>

        <form className='session-form' onSubmit={this.handleSubmit}>
          <div className='session-form-username'>
            <label>Username</label>
            <input
              type='text'
              value={this.state.username}
              onChange={this.handleChange('username')}
              className={`${this.state.usernameValidInput} session-form-username-input`}
            />
            <div className='session-form-username-errors'>{this.renderUsernameErrors()}</div>
          </div>

          <div className='session-form-password'>
            <label>Password</label>
            <input
              type='password'
              value={this.state.password}
              onChange={this.handleChange('password')}
              className={`${this.state.passwordValidInput} session-form-password-input`}
            />
            <div className='session-form-password-errors'>{this.renderPasswordErrors()}</div>
          </div>

          <input type='submit' value={buttonText}/>
        </form>

        <div className='alt-signup-login'>
          {altText}
          <Link
            to={link}
            className='alt-signup-login-link'
            onClick={this.deleteErrors}
            >
            {altProcessFormText}
          </Link>

        </div>
        {this.demoLoginButton()}
      </div>
    </div>
    );
  }
}

export default withRouter(SessionForm);
