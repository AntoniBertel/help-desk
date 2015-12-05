import angular from 'angular';

var authorizationEvents = {
  loginSuccess: 'event:authLoginSuccess',
  loginFailed: 'event:authLoginFailed',
  logoutSuccess: 'event:authLogoutSuccess',
  sessionTimeout: 'event:authSessionTimeout',
  notAuthenticated: 'event:authNotAuthenticated',
  notAuthorized: 'event:notAuthorized'
};

export default authorizationEvents;