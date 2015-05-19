"use strict";

app.controller( "HomeViewModel",
[ 
    "$scope", "user", //"profileRepository",
    
    function ($scope, user) {
        $scope.friends = [];
        $scope.user = user.loggedInUser;
        $scope.selectedUser = user.selectedUserProfile;

        //$scope.profile = profileRepository.profile;
        //$scope.login = function() {
        //    userRepository.login( $scope.loginData, $scope.rememberMe );
        //};
        //$scope.register = function() {
        //    userRepository.register( registerData, false );
        //};

        if ($scope.user.isLogged) {
            //profileRepository.loadProfile();
        }

        //userRepository
        //    .getFriends()
        //    .success(function( friendsList ) {
        //        var i = 0, len = friendsList.length;
        //
        //        for ( ; i < len; i++ ) {
        //            $scope.friends.push( friendsList[ i ] );
        //        }
        //    })
        //    .error(function( data ) {
        //        console.error( data );
        //    });
}]);