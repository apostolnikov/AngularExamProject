"use strict";

app.controller( "HomeViewModel",
[ 
    "$scope", //"userRepository",
    
    function( $scope, userRepository ) {
        $scope.friends = [];

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