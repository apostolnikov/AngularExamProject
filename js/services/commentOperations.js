app.factory('commentOperations', function commentOperations($resource) {
	var resource = $resource(
		'http://softuni-social-network.azurewebsites.net/api/posts/', {}, {
			getPostComments: {
				url: 'http://softuni-social-network.azurewebsites.net/api/posts/:postId/comments',
				method: 'GET',
				params: {
					postId: '@postId'
				},
				isArray: true
			},
			postComment: {
				url: 'http://softuni-social-network.azurewebsites.net/api/posts/:postId/comments',
				method: 'POST',
				params: {
					postId: '@postId'
				}
			},
			editComment: {
				url: 'http://softuni-social-network.azurewebsites.net/api/posts/:postId/comments/:commentId',
				method: 'PUT',
				params: {
					postId: '@postId',
					commentId: '@commentId'
				}
			},
			deleteComment: {
				url: 'http://softuni-social-network.azurewebsites.net/api/posts/:postId/comments/:commentId',
				method: 'DELETE',
				params: {
					postId: '@postId',
					commentId: '@commentId'
				}
			},
			getCommentDetailedLikes: {
				url: 'http://softuni-social-network.azurewebsites.net/api/posts/:postId/comments/:commentId/likes',
				method: 'GET',
				params: {
					postId: '@postId',
					commentId: '@commentId'
				},
				isArray: true
			},
			getCommentPreviewLikes: {
				url: 'http://softuni-social-network.azurewebsites.net/api/posts/:postId/comments/:commentId/likes/preview',
				method: 'GET',
				params: {
					postId: '@postId',
					commentId: '@commentId'
				}
			},
			likeComment: {
				url: 'http://softuni-social-network.azurewebsites.net/api/posts/:postId/comments/:commentId/likes',
				method: 'POST',
				params: {
					postId: '@postId',
					commentId: '@commentId'
				}
			},
			unlikeComment: {
				url: 'http://softuni-social-network.azurewebsites.net/api/posts/:postId/comments/:commentId/likes',
				method: 'DELETE',
				params: {
					postId: '@postId',
					commentId: '@commentId'
				}
			}
		});

	function getPostComments(postId) {
		return resource.getPostComments({
			postId: postId
		});
	}

	function postComment(postId, commentContent) {
		return resource.postComment({
			postId: postId,
			commentContent: commentContent
		});
	}

	function editComment(postId, commentId) {
		return resource.editComment({
			postId: postId,
			commentId: commentId
		});
	}

	function deleteComment(postId, commentId) {
		return resource.deleteComment({
			postId: postId,
			commentId: commentId
		});
	}

	function getCommentDetailedLikes(postId, commentId) {
		return resource.getCommentDetailedLikes({
			postId: postId,
			commentId: commentId
		});
	}

	function getCommentPreviewLikes(postId, commentId) {
		return resource.getCommentPreviewLikes({
			postId: postId,
			commentId: commentId
		});
	}

	function likeComment(postId, commentId) {
		return resource.likeComment({
			postId: postId,
			commentId: commentId
		});
	}

	function unlikeComment(postId, commentId) {
		return resource.unlikeComment({
			postId: postId,
			commentId: commentId
		});
	}

	return {
		getPostComments: getPostComments,
		postComment: postComment,
		editComment: editComment,
		deleteComment: deleteComment,
		getCommentDetailedLikes: getCommentDetailedLikes,
		getCommentPreviewLikes: getCommentPreviewLikes,
		likeComment: likeComment,
		unlikeComment: unlikeComment
	}
});