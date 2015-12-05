import angular from 'angular';

var authorizationInterceptor = function($rootScope, $q, authorizationEventsConstant) {
  return {
    /**
     * 401 (unauthorized) - the user not logged in
     * 403 (forbidden) - the user is logged in but isnt allowed access
     * 419, 440 - session has expired
     * @param {object} response
     */
    responseError: function(response) {
      $rootScope.$broadcast({
        401: authorizationEventsConstant.notAuthorized,
        403: authorizationEventsConstant.notAuthenticated,
        419: authorizationEventsConstant.sessionTimeout,
        440: authorizationEventsConstant.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    }
  }
};

export default authorizationInterceptor