import angular from 'angular';

var loginComponent = ($rootScope, authorizationFactory, authorizationEventsConstant) => {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $state, $stateParams) {
      $scope.submit = () => {
        if($scope.loginForm.$valid) {
          var userCredentials = authorizationFactory.login({
            email: $scope.login.email,
            password: $scope.login.password
          });
          $rootScope.$broadcast(authorizationEventsConstant.loginSuccess, {
            userRole: userCredentials.userRole,
            authorizationToken: userCredentials.authorizationToken
          });
          $state.go($stateParams.redirectToState);
        }
      }
    },
    templateUrl: 'assets/js/templates/components/login-form.html'
  }
};

export default loginComponent;