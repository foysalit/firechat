'use strict';

/**
 * @ngdoc service
 * @name fireChatApp.notification
 * @description
 * # notification
 * Service in the fireChatApp.
 */
angular.module('fireChatApp')
  .factory('Notification', function () {
  	function show (content) {
  		// Let's check if the browser supports notifications
		if (!("Notification" in window)) {
			return console.log("This browser does not support desktop notification");
		} else if (Notification.permission === "granted") {
			var notification = new Notification(content);
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
			  if (permission === "granted") {
			    var notification = new Notification(content);
			  }
			});
		}
  	}

  	return {
  		newMessage: function (userName, message) {
  			if (!angular.isUndefined(userName))
  				show("New Message From: "+ userName);
  		}
  	};
  });
