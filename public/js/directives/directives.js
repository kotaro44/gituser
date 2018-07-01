'use strict';

/**
 * Directives
 */
var Directives = angular.module('gituser.directives', []);

Directives.directive('gituser', [function gituser() {
  return {
    restrict: 'E',
    templateUrl: 'public/partials/gituser.html',
    link: function link(scope, element, attributes) {

    },
    controller: ['$scope', '$http', '$window', '$location', function seedCtrl($scope, $http, $window, $location) {
      console.log($location);
    }],
  };
}]);
