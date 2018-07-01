'use strict';

/**
 * Controllers
 */
var Controllers = angular.module('gituser.controllers', []);

Controllers.controller('gitUserCtrl', ['$scope', 'GitHubApi', '$routeParams', '$window',
  function gitUserCtrl($scope, GitHubApi, $routeParams, $window) {
    $scope.vm = {
      userName: $routeParams.userName || '',
      userNameChange: _userNameChange,
      isValid: false,
      isLoading: false,
      untouched: true,
      modelOpts: {
        debounce: 500,
      },
      goToProjects: _goToProjects,
      keyPress: _keyPress,
    };

    function _goToProjects() {
      if (!$scope.vm.isValid || $scope.vm.isLoading) {
        return;
      }

      $window.location.href = '/user/' + $scope.vm.userName;
    };

    function _userNameChange() {
      $scope.vm.isLoading = true;
      $scope.vm.untouched = false;
      return GitHubApi.getUserData($scope.vm.userName).then(function onResolve() {
        $scope.vm.isLoading = false;
        $scope.vm.isValid = true;
      }).catch(function onError() {
        $scope.vm.isLoading = false;
        $scope.vm.isValid = false;
      });
    };

    function _keyPress(event) {
      if (event.keyCode === 13) {
        $scope.vm.goToProjects();
      }
    };
  }]);

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
    console.log(data);
  }).catch(function onError() {
    $scope.vm.isLoading = false;
  });

  function _goBack() {
    $window.location.href = '/user/' + $scope.vm.userName;
  };
}]);
