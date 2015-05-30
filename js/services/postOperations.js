app.factory('postOperations', function postOperations($resource) {
	var resource = $resource(
		'http://softuni-social-network.azurewebsites.net/api/Posts/', {}, {
			createPost: {
				url: 'http://softuni-social-network.azurewebsites.net/api/Posts',
				method: 'POST'
			},
			getPostById: {
				url: 'http://softuni-social-network.azurewebsites.net/api/Posts/:id',
				method: 'GET',
				params: {
					id: '@id'
				}
			},
			editPost: {
				url: 'http://softuni-social-network.azurewebsites.net/api/Posts/:id',
				method: 'PUT',
				params: {
					id: '@id'
				}
			},
			deletePost: {
				url: 'http://softuni-social-network.azurewebsites.net/api/Posts/:id',
				method: 'DELETE',
				params: {
					id: '@id'
				}
			},
			getPostDetailedLikes: {
				url: 'http://softuni-social-network.azurewebsites.net/api/Posts/:id/likes',
				method: 'GET',
				params: {
					id: '@id'
				},
				isArray: true
			},
			getPostPreviewLikes: {
				url: 'http://softuni-social-network.azurewebsites.net/api/Posts/:id/likes/preview',
				method: 'GET',
				params: {
					id: '@id'
				}
			},
			likePost: {
				url: 'http://softuni-social-network.azurewebsites.net/api/Posts/:id/likes',
				method: 'POST',
				params: {
					id: '@id'
				}
			},
			unlikePost: {
				url: 'http://softuni-social-network.azurewebsites.net/api/Posts/:id/likes',
				method: 'DELETE',
				params: {
					id: '@id'
				}
			}
		});

	function createPost(postContent, username) {
		return resource.createPost({
			postContent: postContent,
			username: username
		});
	}

	function getPostById(id) {
		return resource.getPostById({
			id: id
		});
	}

	function editPost(postContent, id) {
		return resource.editPost({
			id: id,
			postContent: postContent
		});
	}

	function deletePost(id) {
		return resource.deletePost({
			id: id
		});
	}

	function getPostDetailedLikes(id) {
		return resource.getPostDetailedLikes({
			id: id
		});
	}

	function getPostPreviewLikes(id) {
		return resource.getPostPreviewLikes({
			id: id
		});
	}

	function likePost(id) {
		return resource.likePost({
			id: id
		});
	}

	function unlikePost(id) {
		return resource.unlikePost({
			id: id
		});
	}

	return {
		createPost: createPost,
		getPostById: getPostById,
		editPost: editPost,
		deletePost: deletePost,
		getPostDetailedLikes: getPostDetailedLikes,
		getPostPreviewLikes: getPostPreviewLikes,
		likePost: likePost,
		unlikePost: unlikePost
	}
});