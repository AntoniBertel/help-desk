import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import ngTranslate from 'angular-translate';
import ngTranslateLoader from 'angular-translate-loader-static-files';
import ngTranslateCookieStorage from 'angular-translate-storage-cookie';
import ngTranslateLocalStorage from 'angular-translate-storage-local';

var helpdesk = angular.module('helpdesk', [uiRouter, ngCookies, ngTranslate]);
helpdesk.config(($stateProvider, $urlRouterProvider, $translateProvider, userRolesConstant) => {
  $urlRouterProvider.otherwise('not-found');
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'assets/js/templates/login.html',
    params: {
      redirectToState: 'home'
    }
  }).state('register', {
    url: '/register',
    templateUrl: 'assets/js/templates/register.html',
    params: {
      redirectToState: 'home',
      accessPermissions: [userRolesConstant.all]
    }
  }).state('notFound', {
    url: '/not-found',
    templateUrl: 'assets/js/templates/not-found.html'
  }).state('forbidden', {
    url: '/forbidden',
    templateUrl: 'assets/js/templates/forbidden.html'
  }).state('home', {
    url: '/'
  });

  $translateProvider.useStaticFilesLoader({
    prefix: 'assets/js/configurations/locales/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('enUS');
  $translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.useLocalStorage();
});

/**
 * Components
 */
import loginComponent from './directives/login-component';
import registerComponent from './directives/register-component';
helpdesk.directive('loginComponent', loginComponent);
helpdesk.directive('registerComponent', registerComponent);

/**
 * Helper directives
 */
import repeatPassword from './directives/helpers/repeat-password';
helpdesk.directive('repeatPassword', repeatPassword);

/**
 * Services
 */
import sessionService from './services/user-session';
helpdesk.service('userSessionService', sessionService);

/**
 * Factories
 */
import authorizationFactory from './factories/authorization';
import authorizationInterceptorFactory from './factories/authorization-interceptor';
import userFactory from './factories/user';
helpdesk.factory('authorizationFactory', authorizationFactory);
helpdesk.factory('authorizationInterceptorFactory', authorizationInterceptorFactory);
helpdesk.factory('userFactory', userFactory);

/**
 * Constants
 */
import authorizationEventsConstant from './configurations/constants/authorization-events';
import userRolesConstant from './configurations/constants/user-roles';
import configurationConstant from './configurations/configuration';
helpdesk.constant('authorizationEventsConstant', authorizationEventsConstant);
helpdesk.constant('userRolesConstant', userRolesConstant);
helpdesk.constant('configurationConstant', configurationConstant);

/**
 * Configuration
 */
helpdesk.config(function($httpProvider) {
  $httpProvider.interceptors.push(['$injector', function($injector) {
    return $injector.get('authorizationInterceptorFactory');
  }]);
});

helpdesk.run(function($rootScope, $state, authorizationFactory, authorizationEventsConstant) {
  $rootScope.$on('$stateChangeStart', function(event, next) {
    if(next.accessPermissions && !authorizationFactory.isAuthenticated(next.accessPermissions)) {
      event.preventDefault();
      $rootScope.$broadcast(authorizationEventsConstant.notAuthenticated, {
        redirectToState: next.name
      });
    }
    else if(next.accessPermissions && !authorizationFactory.isAuthorized()) {
      event.preventDefault();
      $rootScope.$broadcast(authorizationEventsConstant.notAuthorized, {
        redirectToState: next.name
      });
    }
  });
  $rootScope.$on(authorizationEventsConstant.loginSuccess, function(event, data) {
    $rootScope.userRole = data.userRole;
    $rootScope.authorizationToken = data.authorizationToken;
  });
  $rootScope.$on(authorizationEventsConstant.logoutSuccess, function(event, data) {
    $rootScope.userRole = null;
    $rootScope.authorizationToken = null;
  });
  $rootScope.$on(authorizationEventsConstant.notAuthorized, function(event, data) {
    $state.go('login', {
      redirectToState: data.redirectToState
    });
  });
  $rootScope.$on(authorizationEventsConstant.notAuthenticated, function(event, data) {
    $state.go('forbidden');
  });
});