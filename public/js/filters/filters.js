'use strict';

/**
 * Filters
 */
var Filters = angular.module('gituser.filters', []);

Filters.filter('capitalize', function capitalizeScope() {
  return function capitalize(text) {
  	return text[0].toUpperCase() + text.substring(1).toLowerCase();
  };
});
