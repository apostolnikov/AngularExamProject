"use strict";

app.controller( "NavbarViewModel",
[ 
    "$scope", "userRepository",
    
    function( $scope, userRepository ) {
        $scope.user = userRepository.user;
        console.log($scope.user);
        $scope.users = [];
        // Reload friend requests on every route
            //$rootScope.$on("$locationChangeSuccess", function() {
            //   if ( user.isLogged ) getFriendRequests();
            //});
        $scope.search = function() {
            if ( !$scope.searchText ) {
                $scope.users = [];
                return;
            }

            userRepository.searchUsers( $scope.searchText ).success(function( res ) {
                $scope.users = res;
                console.log(res);
            });
        };

        $scope.logout = userRepository.logout;
}]);