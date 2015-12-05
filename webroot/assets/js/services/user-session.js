import angular from 'angular';

/**
 * @param $window
 * @returns function {sessionService}
 */
var sessionService = function($window) {
  /**
   * @param {string} userRole
   * @param {string} authorizationToken
   * @returns {function} sessionService
   */
  this.create = (userRole, authorizationToken) => {
    this.userRole = userRole;
    this.authorizationToken = authorizationToken;
    return this;
  };
  this.destroy = () => {
    this.userRole = null;
    this.authorizationToken = null;
    return this;
  };
  this.save = () => {
    $window.sessionStorage.setItem('userRole', this.userRole);
    $window.sessionStorage.setItem('authorizationToken', this.authorizationToken);
  };
  this.remove = () => {
    $window.sessionStorage.removeItem('userRole');
    $window.sessionStorage.removeItem('authorizationToken');
  };
  this.getUser = () => {
    return {
      userRole: $window.sessionStorage.getItem('userRole') || this.userRole,
      authorizationToken: $window.sessionStorage.getItem('authorizationToken') || this.authorizationToken
    };
  };
  return this;
};

export default sessionService;