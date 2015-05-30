app.controller('commentController', function CommentController($scope, $http, commentOperations) {
	$scope.newComment = {
		commentContent: null
	}

	$scope.likeComment = function(postId, commentId) {
		commentOperations.likeComment(postId, commentId).$promise.then(function(data) {
			
		});
	}

	$scope.unlikeComment = function(postId, commentId) {
		commentOperations.unlikeComment(postId, commentId).$promise.then(function(data) {
			
		});
	}

	$scope.postComment = function(isFormValid, postId) {
		if (isFormValid) {
			commentOperations.postComment(postId, $scope.newComment.commentContent).$promise.then(function(data) {
				
			});
		}
	}
});