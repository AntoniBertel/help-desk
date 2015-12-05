import angular from 'angular';
import lodash from 'lodash';

var repeatPassword = () => {
  return {
    require: 'ngModel',
    link: function($scope, element, attributes, ngModel) {
      var current = attributes.ngModel;
      var target = attributes.repeatPassword;
      $scope.$watch(`[${current}, ${target}]`, (value) => {
        ngModel.$setValidity('match', lodash.first(value) == lodash.last(value));
      });
    }
  }
};

export default repeatPassword;