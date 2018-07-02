'use strict';

Controllers.controller('gitUserProjectCtrl', ['$scope', 'GitHubApi', '$routeParams', '$window', function gitUserCtrl($scope, GitHubApi, $routeParams, $window) {
  $scope.vm = {
    isLoading: true,
    userName: $routeParams.userName || '',
    projectName: $routeParams.projectName || '',
    goBack: _goBack,
    readMe: null,
  };

  GitHubApi.getProjectReadme($scope.vm.userName, $scope.vm.projectName).then(function onResolve(data) {
    $scope.vm.isLoading = false;
    $scope.vm.readMe = data;
  }).catch(function onError() {
    $scope.vm.isLoading = false;
  });

  function _goBack() {
    $window.location.href = '/user/' + $scope.vm.userName;
  };
}]);
