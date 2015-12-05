import angular from 'angular';

var UserService = function($http, configurationConstant) {
  return {
    login: function(email, password) {
      return $http({
        method: configurationConstant.api.users.login.method,
        url: configurationConstant.api.users.login.url,
        data: {
          userEmail: email,
          userPassword: password
        }
      });
    },
    register: function(email, password) {
      return $http({
        method: configurationConstant.api.users.register.method,
        url: configurationConstant.api.users.register.url,
        data: {
          userEmail: email,
          userPassword: password
        }
      });
    }
  }
};

export default UserService;
