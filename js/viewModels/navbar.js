"use strict";

app.controller( "NavbarViewModel",
[ 
    "$scope", "user", "$rootScope",
    
    function ($scope, user, $rootScope) {
        //loadRequests();

        $scope.userRepository = user;
       // $scope.profile = profileRepository.profile;
        //$scope.createImage = image.appendBase64Header;

        $scope.users = [];

        function onRouteChanged() {
            // Hide search results
            $scope.users = [];
            $scope.searchText = "";

            if ( !userRepository.user.isLogged ) {
                return;
            }

            profileRepository.getFriendRequests()
                .success(function( friendRequests ) {
                    $scope.friendRequests = friendRequests;
                })
                .error(function(){});
        }
}]);