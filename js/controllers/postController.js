app.controller('postController', function PostController($scope, $http, postOperations, $routeParams) {
	$scope.newPost = {postContent:null, username:$routeParams.username};

	$scope.likePost = function(id) {
		postOperations.likePost(id).$promise.then(function(data) {
		});
	}

	$scope.unlikePost = function(id) {
		postOperations.unlikePost(id).$promise.then(function(data) {
		});
	}

	$scope.createPost = function(){
		postOperations.createPost($scope.newPost.postContent, $scope.newPost.username);
	}
});