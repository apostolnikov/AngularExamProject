"use strict";

app.controller( "EditProfileViewModel", [ "$scope", "userRepository", function( $scope, userRepo ) {
    var user = userRepo.user;

    $scope.name = user.name;
    $scope.email = user.email;
    $scope.gender = user.gender;

    console.log(user);

    $scope.editProfile = function() {
        getBase64(function( base64 ) {
            var regex = /^data:image\/(.+?);base64,(.+)$/i;

            console.log(regex.exec(base64)[2]);
        });
    };

    function getBase64( callback ) {
        var fileInput = document.getElementById( "profilePictureInput" ),
            file = fileInput.files[ 0 ],
            fileReader = new FileReader();

        fileReader.onloadend = function() {
            callback( fileReader.result );
        }

        if ( file ) {
            fileReader.readAsDataURL( file );
        } else {
            callback( null );
        }
    }
}]);