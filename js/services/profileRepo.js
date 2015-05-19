"use strict";

app.service( "profileRepository",
[
    "httpClient", "notify", "userRepository",

    function( httpClient, notify, userRepo ) {
        var profileRepo = this;

        this.profile = {};

        this.loadProfile = function() {
            return httpClient.
                get( "me" ).
                error( notify.error ).
                success(function( profileData ) {
                    angular.extend( profileRepo.profile, profileData );
                    localStorage.profile = JSON.stringify( profileData );
                });
        };

        this.updateProfile = function() {
            return httpClient.
                put( "me", profileRepo.profile ).
                success(function() {
                    localStorage.profile = JSON.stringify( profileRepo.profile );
                });
        };

        this.changePassword = function( oldPassword, newPassword, confirmPassword ) {
            var data = {
                "oldPassword": oldPassword,
                "newPassword": newPassword,
                "confirmPassword": confirmPassword
            };
            return httpClient.put( "me/ChangePassword", data );
        };

        this.getFriends = function( isPreview ) {
            var url = "me/friends";
            if ( isPreview ) url += "/preview";
            return httpClient.get( url );
        };

        this.getFeed = function( start, count ) {
            var url = "me/feed?StartPostId=&PageSize=" + count;
            return httpClient.get( url );
        };

        this.getFriendRequests = function() {
            return httpClient.get( "me/requests" );
        };

        this.updateFriendRequest = function( requestId, status ) {
            var url = "me/requests/" + requestId + "?status=" + status;
            return httpClient.put( url );
        };

        this.sendFriendRequest = function( username ) {
            return httpClient.post( "me/requests/" + username );
        };

        if ( userRepo.user.isLogged ) this.loadProfile();
}]);