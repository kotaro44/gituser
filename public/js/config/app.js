'use strict';

// Declare app level module which depends on filters, and services
angular.module('gituser', [
  'ngSanitize',
  'ngRoute',
  'gituser.filters',
  'gituser.services',
  'gituser.directives',
  'gituser.controllers',
]).config(['$routeProvider', '$locationProvider', function routePRovider($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'public/partials/gituser.html',
      controller: 'gitUserCtrl',
    })
    .when('/user/:userName', {
      templateUrl: 'public/partials/gituser-projects.html',
      controller: 'gitUserProfileCtrl',
    })
    .when('/user/:userName/:projectName', {
      templateUrl: 'public/partials/gituser-project.html',
      controller: 'gitUserProjectCtrl',
    });

  $locationProvider.html5Mode(true);
}]);
