app.controller('userController', function UserController($rootScope, $scope, $http, userOperations, 
	$location, $routeParams, postOperations) {
	$scope.username = decodeURIComponent($routeParams.username);
	$scope.currentPostId;
	$scope.feedLimit = 10;
	$scope.noMore = false;

	$scope.userData = {
		username: null,
		password: null
	};

	$scope.registerData = {
		username: null,
		name: null,
		password: null,
		confirmPassword: null,
		email: null,
		gender: 0
	}

	$scope.friendData = {};

	$scope.wallPosts = [];

	$scope.feed = function() {
		$scope.feedLimit += 10;
	}


	$scope.getUserWallPosts = function() {
		userOperations.userWallPosts($scope.username, $scope.currentPostId, 10).$promise.then(function(data) {
			if (data.length > 0) {
				var lastId = data[data.length - 1].id;
				if ($scope.wallPosts.length == 0) {
					$scope.wallPosts = data;
				} else {
					for (var i = 0; i < data.length; i++) {
						$scope.wallPosts.push(data[i]);
					}
				}

				$scope.currentPostId = lastId;
			} else {
				$scope.noMore = true;
			}
		});
	}

	$scope.updatePost = function(id) {
		postOperations.getPostById(id).$promise.then(function(data) {
			for (var i = 0; i < $scope.wallPosts.length; i++) {
				if ($scope.wallPosts[i].id == data.id) {
					$scope.wallPosts[i] = data;
				}
			}
		});
	}

	$scope.isLogged = function() {
		if (sessionStorage['sessionToken']) {
			return true;
		}

		return false;
	}

	$scope.userLogin = function(isLoginValid) {
		if (isLoginValid) {
			userOperations.login($scope.userData.username, $scope.userData.password).$promise.then(function(data) {
				sessionStorage['sessionToken'] = data['access_token'];
				$scope.userData = {};
			});
		}
	}

	$scope.userRegister = function(isRegisterValid) {
		if (isRegisterValid) {
			userOperations.register(
					$scope.registerData.username,
					$scope.registerData.password,
					$scope.registerData.confirmPassword,
					$scope.registerData.name,
					$scope.registerData.email,
					$scope.registerData.gender)
				.$promise.then(function(data) {
					sessionStorage['sessionToken'] = data['access_token'];
					$scope.registerData = {};
				});
		}
	}

	$scope.userLogout = function() {
		userOperations.logout()
			.$promise.then(function(data) {
				sessionStorage.clear();
				$scope.userData = {};
				$scope.userData = {};
				$location.path('#/');
			});
	}

	$scope.friendFullInformation = function(username) {
		userOperations.userFullInformation(username)
			.$promise
			.then(function(data) {
				$scope.friendData = data;
			});
	}

	$scope.apply = function() {
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	}

	$scope.$watch(function() {
		return sessionStorage;
	}, function(newVal, oldVal) {
		$http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage['sessionToken'];
		//sessionStorage = newVal;
	}, true);

	$scope.$watch(function() {
		return $scope.feedLimit;
	}, function(newval, oldval) {
		if ($scope.feedLimit > 10) {
			$scope.getUserWallPosts();
		}
	}, true);
});