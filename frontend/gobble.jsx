import React from 'react';
import ReactDOM from 'react-dom';

// TESTING PURPOSES START
import * as SessionApiUtil from './util/session/session_api_util';

window.signUp = SessionApiUtil.signUp;
window.login = SessionApiUtil.login;
window.logout = SessionApiUtil.logout;
// TESTING ENDS

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<h1>gobble</h1>, root);
});
