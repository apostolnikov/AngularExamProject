app.factory('userProfileOperations', function userProfileOperations($resource) {
	var resource = $resource(
		'http://softuni-social-network.azurewebsites.net/api/me/', {}, {
			getDataAboutMe: {
				url: 'http://softuni-social-network.azurewebsites.net/api/me',
				method: 'GET'
			},
			editDataAboutMe: {
				url: 'http://softuni-social-network.azurewebsites.net/api/me',
				method: 'PUT'
			},
			editPassword: {
				url: 'http://softuni-social-network.azurewebsites.net/api/me/ChangePassword',
				method: 'PUT'
			},
			getOwnFriends: {
				url: 'http://softuni-social-network.azurewebsites.net/api/me/friends',
				method: 'GET',
				isArray: true
			},
			getOwnFriendsPreview: {
				url: 'http://softuni-social-network.azurewebsites.net/api/me/friends/preview',
				method: 'GET'
			},
			getOwnWallPosts: {
				url: 'http://softuni-social-network.azurewebsites.net/api/me/' +
					'feed?StartPostId=:startPostId&PageSize=:pageSize',
				method: 'GET',
				params: {
					startPostId: '@startPostId',
					pageSize: '@pageSize'
				},
				isArray: true
			},
			getFriendRequests: {
				url: 'http://softuni-social-network.azurewebsites.net/api/me/requests',
				method: 'GET',
				isArray: true
			},
			respondToFriendRequest: {
				url: 'http://softuni-social-network.azurewebsites.net/api/me/requests/:requestId?status=:status',
				method: 'PUT',
				params: {
					requestId: '@requestId',
					status: '@status'
				}
			},
			sendFriendRequest: {
				url: 'http://softuni-social-network.azurewebsites.net/api/me/requests/:username',
				method: 'POST',
				params: {
					username: '@username'
				}
			}
		});

	function getDataAboutMe() {
		return resource.getDataAboutMe();
	}

	function editDataAboutMe(name, email, gender, profileImageData, coverImageData) {
		return resource.editDataAboutMe({
			name: name,
			email: email,
			gender: gender,
			profileImageData: profileImageData,
			coverImageData: coverImageData
		});
	}

	function editPassword(oldPassword, password, confirmPassword) {
		return resource.editPassword({
			oldPassword: oldPassword,
			newPassword: password,
			confirmPassword: confirmPassword
		});
	}

	function getOwnFriends() {
		return resource.getOwnFriends();
	}

	function getOwnFriendsPreview() {
		return resource.getOwnFriendsPreview();
	}

	function getOwnWallPosts(startPostId, pageSize) {
		return resource.getOwnWallPosts({
			startPostId: startPostId,
			pageSize: pageSize
		});
	}

	function getFriendRequests() {
		return resource.getFriendRequests();
	}

	function respondToFriendRequest(requestId, status) {
		return resource.respondToFriendRequest({
			requestId: requestId,
			status: status
		});
	}

	function sendFriendRequest(username) {
		return resource.sendFriendRequest({
			username: username
		});
	}

	return {
		getDataAboutMe: getDataAboutMe,
		editDataAboutMe: editDataAboutMe,
		editPassword: editPassword,
		getOwnFriends: getOwnFriends,
		getOwnFriendsPreview: getOwnFriendsPreview,
		getOwnWallPosts: getOwnWallPosts,
		getFriendRequests: getFriendRequests,
		respondToFriendRequest: respondToFriendRequest,
		sendFriendRequest: sendFriendRequest
	}
});