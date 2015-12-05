import angular from 'angular';

var developmentConfiguration = {
  api: {
    users: {
      login: {
        url: 'users/',
        method: 'GET'
      },
      register: {
        url: '/users',
        method: 'POST'
      }
    }
  }
};

export default developmentConfiguration;
