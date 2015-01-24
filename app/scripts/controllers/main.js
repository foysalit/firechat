'use strict';

/**
 * @ngdoc function
 * @name fireChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fireChatApp
 */
angular.module('fireChatApp')
  .controller('MainCtrl', function ($scope, $firebase, Notification) {
  	var vm = this;

    var ref = new Firebase("https://intense-inferno-3618.firebaseIO.com/messages/");
	var sync = $firebase(ref);

	vm.messages = sync.$asArray();
	vm.message = {
		user: 'foysal',
	};
	vm.unseenMessage = false;
	vm.messagesLoaded = false;

	vm.sendMessage = sendMessage;
	vm.incomingNewMessage = incomingNewMessage;

	vm.messages.$loaded(function (data) {
		vm.messagesLoaded = true;
	});

	vm.messages.$watch(function (event, data) {
		if (event.event === 'child_added') {
			vm.incomingNewMessage(vm.messages.$getRecord(event.key));
		}
	});

	function incomingNewMessage (message) {
		if (!vm.messagesLoaded)
			return;

		vm.unseenMessage = true;
		Notification.newMessage(message.user, message.content);
	}

	function sendMessage() {
		console.log(vm.message, sync);

		vm.messages.$add(vm.message);

		vm.message.content = '';
	}
  });
