app.factory('userOperations', function userOperations($resource) {
	var resource = $resource(
		'http://softuni-social-network.azurewebsites.net/api/users/', {}, {
			login: {
				url: 'http://softuni-social-network.azurewebsites.net/api/users/Login',
				method: 'POST'
			},
			register: {
				url: 'http://softuni-social-network.azurewebsites.net/api/users/Register',
				method: 'POST'
			},
			logout: {
				url: 'http://softuni-social-network.azurewebsites.net/api/users/Logout',
				method: 'POST'
			},
			userPreview: {
				url: 'http://softuni-social-network.azurewebsites.net/api/users/:username/preview',
				method: 'GET',
				params: {
					username: '@username'
				}
			},
			searchForUser: {
				url: 'http://softuni-social-network.azurewebsites.net/api/users/search?searchTerm=:searchTerm',
				method: 'GET',
				params: {
					searchTerm: '@searchTerm'
				}
			},
			userFullInformation: {
				url: 'http://softuni-social-network.azurewebsites.net/api/users/:username',
				method: 'GET',
				params: {
					username: '@username'
				}
			},
			userWallPosts: {
				url: 'http://softuni-social-network.azurewebsites.net/' +
					'api/users/:username/wall?StartPostId=:startPostId&PageSize=:pageSize',
				method: 'GET',
				params: {
					username: '@username',
					startPostId: '@startPostId',
					pageSize: '@pageSize'
				},
				isArray: true
			},
			friendFriendsPreview: {
				url: 'http://softuni-social-network.azurewebsites.net/api/users/:username/friends/preview',
				method: 'GET',
				params: {
					username: '@username'
				}
			},
			friendFriendsFullInformation: {
				url: 'http://softuni-social-network.azurewebsites.net/api/users/:username/friends',
				method: 'GET',
				params: {
					username: '@username'
				}
			}

		});

	function login(username, password) {
		return resource.login({
			username: username,
			password: password
		});
	}

	function register(username, password, confirmPassword, name, email, gender) {
		return resource.register({
			username: username,
			password: password,
			confirmPassword: confirmPassword,
			name: name,
			email: email,
			gender: gender
		});
	}

	function logout() {
		return resource.logout();
	}

	function userPreview(username) {
		return resource.userPreview({
			username: username
		});
	}

	function searchForUser(searchTerm) {
		return resource.searchForUser({
			searchTerm: searchTerm
		});
	}

	function userFullInformation(username) {
		return resource.userFullInformation({
			username: username
		});
	}

	function userWallPosts(username, startPostId, pageSize) {
		return resource.userWallPosts({
			username: username,
			startPostId: startPostId,
			pageSize: pageSize
		});
	}

	function friendFriendsPreview(username) {
		return resource.friendFriendsPreview({
			username: username
		});
	}

	function friendFriendsFullInformation(username) {
		return resource.friendFriendsFullInformation({
			username: username
		});
	}

	return {
		login: login,
		register: register,
		logout: logout,
		userPreview: userPreview,
		searchForUser: searchForUser,
		userFullInformation: userFullInformation,
		userWallPosts: userWallPosts,
		friendFriendsPreview: friendFriendsPreview,
		friendFriendsFullInformation: friendFriendsFullInformation
	}
});