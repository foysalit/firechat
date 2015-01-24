'use strict';

/**
 * @ngdoc function
 * @name fireChatApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fireChatApp
 */
angular.module('fireChatApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
