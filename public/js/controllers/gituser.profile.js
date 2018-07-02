'use strict';

Controllers.controller('gitUserProfileCtrl', ['$scope', 'GitHubApi', '$routeParams', '$window',
  function gitUserCtrl($scope, GitHubApi, $routeParams, $window) {
    $scope.vm = {
      isLoading: true,
      userName: $routeParams.userName || '',
      goBack: _goBack,
      goToProject: _goToProject,
    };

    init();
    function init() {
      GitHubApi.getUserProjects($scope.vm.userName).then(function onResolve(data) {
        $scope.vm.isLoading = false;
        $scope.vm.projects = data.repos;
      }).catch(function onError() {
        $scope.vm.goBack();
      });
    };

    function _goBack() {
      $window.location.href = '/';
    };

    function _goToProject(projectName) {
      $window.location.href = '/user/' + $scope.vm.userName + '/' + projectName;
    };
  }]);
