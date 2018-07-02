'use strict';

/**
 * Services
 */
var Services = angular.module('gituser.services', []);

Services.service('GitHubApi', ['$http', '$window', function GitHubApi($http, $window) {
  var GitHubApi = {
  	location: 'https://api.github.com/',
    getUserData: _getUserData,
  	getUserProjects: _getUserProjects,
    getProjectReadme: _getProjectReadme,
    getRequestParams: _getRequestParams,
    request: _request,
  };

  function _getRequestParams(path, isHtml) {
    var headers = {
      Authorization: 'token 0e31c8598a5269421464e48f0b54c4ceca506c30',
    };

    if (isHtml) {
      headers.Accept = 'application/vnd.github.html';
    }

    return {
      method: 'GET',
      headers: headers,
      url: GitHubApi.location + path,
    };
  };

  function _getUserData(userName) {
  	return GitHubApi.request('users/' + userName)
      .then(function successCallback(response) {
        return response.data;
    	});
  };

  function _getUserProjects(userName) {
    var result = null;
    return GitHubApi.request('users/' + userName)
      .then(function successCallback(response) {
        result = response.data;
        return GitHubApi.request('users/' + userName + '/repos')
          .then(function successCallback(response) {
            result.repos = response.data;
            return result;
          });
      });
  };

  function _getProjectReadme(userName, repoName) {
    return GitHubApi.request('repos/' + userName + '/' + repoName + '/readme', true)
      .then(function successCallback(response) {
        return response.data;
      });
  };

  function _request(url, isHtml) {
    return $http(GitHubApi.getRequestParams(url, isHtml));
  };

  function _request(url, isHtml) {
    return $http(GitHubApi.getRequestParams(url, isHtml)).catch(function onError(error) {
      if (error.status === 401 && error.statusText === 'Unauthorized') {
        alert('the github api token ahd expired.');
        $window.location = '/';
      }
    });
  };

  return GitHubApi;
}]);
