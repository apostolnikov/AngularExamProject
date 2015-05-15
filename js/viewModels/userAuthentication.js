"use strict";

app.controller( "UserAuthenticationViewModel",
[
    "$scope", "userRepository",

    function( $scope, userRepository ) {
        $scope.login = function() {
            userRepository.login( $scope.loginData );
        };

        $scope.register = function() {
            userRepository.register( $scope.registerData );
        };
}]);