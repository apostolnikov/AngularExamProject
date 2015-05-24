"use strict";

app.controller( "ProfileViewModel", 
[
    "$scope", "$routeParams", "userRepository", "image",
    
    function( $scope, $routeParams, userRepository, image ) {
        $scope.username = $routeParams.username;
        $scope.createimage = image.appendBase64Header;
        
        //userRepository.
        //    getUserData( $scope.username, false ).
        //    success(function( userData ) {
        //        angular.extend( $scope, userData );
        //        $scope.coverPhoto = image.appendBase64Header( userData.coverImageData );
        //        console.log($scope.coverPhoto);
        //    });

        //user.getInfo( $scope.username ).success(function( data ) {
        //    $scope.userData = data;
        //    console.log(data);
        //});
}]);