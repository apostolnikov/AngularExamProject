app.controller('userProfileController', function UserProfileController($scope, $http, $location, userProfileOperations, $route, postOperations) {
	$scope.currentPostId;
	$scope.feedLimit = 10;
	$scope.noMore = false;

	$scope.meData = {
		id: null,
		username: null,
		password: null,
		confirmPassword: null,
		name: null,
		email: null,
		gender: 0,
		profileImageData: null,
		profilePreview: null,
		coverImageData: null
	}

	$scope.friendRequestsInfo = {
		totalCount: 0,
		has: false
	};

	$scope.friendsPreview = {}

	$scope.changePassword = {
		oldPassword: null,
		password: null,
		confirmPassword: null
	}

	$scope.friendRequests = {};

	$scope.wallPosts = [];

	$scope.feed = function() {
		$scope.feedLimit += 10;
	}

	$scope.getDataAboutMe = function() {
		userProfileOperations.getDataAboutMe()
			.$promise.then(function(data) {
				$scope.meData.id = data.id;
				$scope.meData.name = data.name;
				$scope.meData.username = data.username;
				$scope.meData.email = data.email;
				$scope.meData.profileImageData = data.profileImageData;
				$scope.meData.coverImageData = data.coverImageData;
				$scope.meData.gender = data.gender;
			});

	}

	$scope.getFriendRequests = function() {
		userProfileOperations.getFriendRequests().$promise.then(function(data) {
			data.forEach(function(entry) {
				$scope.friendRequests['request ' + entry.id] = {
					id: entry.id,
					status: entry.status,
					user: entry.user
				}
				$scope.friendRequestsInfo.totalCount++;
				$scope.friendRequestsInfo.has = true;

			});
		});
	}

	$scope.respondToFriendRequest = function(requestId, status) {
		userProfileOperations.respondToFriendRequest(requestId, status).$promise.then(function(data) {

			$location.path('#/');
		});
	}

	$scope.getOwnWallPosts = function() {
		userProfileOperations.getOwnWallPosts($scope.currentPostId, 10).$promise.then(function(data) {
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

	$scope.editProfile = function(isFormValid) {
		if (isFormValid) {
			userProfileOperations.editDataAboutMe(
					$scope.meData.name,
					$scope.meData.email,
					$scope.meData.gender,
					$scope.meData.profileImageData,
					$scope.meData.coverImageData)
				.$promise.then(function(data) {
					$location.path('#/');

				});
		}
	}

	$scope.changePassword = function(isFormValid) {
		if (isFormValid) {
			userProfileOperations.editPassword(
					$scope.changePassword.oldPassword,
					$scope.changePassword.password,
					$scope.changePassword.confirmPassword)
				.$promise.then(function(data) {
					$location.path('#/');
				});
		}
	}

	$scope.pictureUpload = function(event) {
		var filesSelected = event.target.files;

		if (filesSelected.length > 0) {
			var fileToLoad = filesSelected[0];
			var raw;
			var fileReader = new FileReader();

			fileReader.onload = function(fileLoadedEvent) {
				raw = fileLoadedEvent.target.result;
				var baseString = raw.split(',');
				$scope.$apply(function() {
					$scope.meData.profileImageData = raw;
				});
			};
			fileReader.readAsDataURL(fileToLoad);
		}
	}

	$scope.getOwnFriendsPreview = function() {
		userProfileOperations.getOwnFriendsPreview().$promise
			.then(function(data) {
				$scope.friendsPreview = data;
				if ($scope.friendsPreview.friends.length > 10) {
					$scope.friendsPreview.friends = $scope.friendsPreview.friends.slice(0, 6);
				}
			});
	}

	$scope.sendFriendRequest = function(username) {
		userProfileOperations.sendFriendRequest(username).$promise
			.then(function(data) {
				$route.reload();
			})
	}

	$scope.apply = function(){
		if(!$scope.$$phase) {$scope.$apply();}
	}

	$scope.$watch(function() {
		return $scope.feedLimit;
	}, function(newval, oldval) {
		if ($scope.feedLimit > 10) {
			$scope.getOwnWallPosts();
		}
	}, true);

});