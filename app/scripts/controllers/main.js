'use strict';

/**
 * @ngdoc function
 * @name fireChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fireChatApp
 */
angular.module('fireChatApp')
  .controller('MainCtrl', function ($scope, $firebase) {
  	var vm = this;

    var ref = new Firebase("https://intense-inferno-3618.firebaseIO.com/messages/");
	var sync = $firebase(ref);

	vm.messages = sync.$asArray();
	vm.message = {
		user: 'foysal',
	};
	vm.unseenMessage = false;

	vm.sendMessage = sendMessage;
	vm.incomingNewMessage = incomingNewMessage;

	vm.messages.$loaded(function (data) {
		vm.unseenMessage = false;
	});

	vm.messages.$watch(function (event) {
		console.log(event);
		if (event.event === 'child_added') {
			vm.incomingNewMessage();
		}
	});

	function incomingNewMessage () {
		vm.unseenMessage = true;
	}

	function sendMessage() {
		console.log(vm.message, sync);

		vm.messages.$add(vm.message);

		vm.message.content = '';
	}
  });
