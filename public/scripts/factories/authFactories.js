angular.module('SpoopyDungeon')
    .factory('authFactory', authFactory)
    .factory('authIntercept', authIntercept)
authFactory.$inject = ['$window'];
authIntercept.$inject = ['$q', '$location', 'authFactory'];

function authFactory($window) {
    var authTokenFactory = {}

    // get the token out of local storage
    authTokenFactory.getToken = function () {
        return $window.localStorage.getItem('spoopyToken')
    }

    // function to set token or clear token
    // if a token is passed, set the token
    // if there is no token, clear it from local storage
    authTokenFactory.setToken = function (token) {
        if (token)
            $window.localStorage.setItem('spoopyToken', token)
        else
            $window.localStorage.removeItem('spoopyToken')
    }

    return authTokenFactory
}

function authIntercept ($q, $location, authFactory) {
    var interceptorFactory = {}

    // this will happen on all HTTP requests
    interceptorFactory.request = function (config) {
      // grab the token
      var token = authFactory.getToken()

      // if the token exists, add it to the header as x-access-token
      if (token)
        config.headers['Authorization'] = token

      return config
    }

    // happens on response errors
    interceptorFactory.responseError = function (response) {
      // if our server returns a 403 forbidden response
      if (response.status == 403) {
        authFactory.setToken()
        $location.path('/')
      }

      // return the errors from the server as a promise
      return $q.reject(response)
    }

    return interceptorFactory
}