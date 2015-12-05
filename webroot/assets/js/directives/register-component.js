import angular from 'angular';

var registerComponent = ($rootScope, authorizationFactory, authorizationEventsConstant) => {
  return {
    restrict: 'E',
    scope: {},
    replace: true,
    controller: function($scope, $state, $stateParams) {
      $scope.submit = () => {
        if($scope.registerForm.$valid) {
          var userCredentials = authorizationFactory.register({
            email: $scope.register.email,
            password: $scope.register.password
          });
          $rootScope.$broadcast(authorizationEventsConstant.loginSuccess, {
            userRole: userCredentials.userRole,
            authorizationToken: userCredentials.authorizationToken
          });
          $state.go($stateParams.redirectToState);
        }
      }
    },
    templateUrl: 'assets/js/templates/components/register-form.html'
  }
};

export default registerComponent;