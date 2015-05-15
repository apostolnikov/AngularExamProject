"use strict";

app.service( "profileRepository",
[
    "ajax", "notify",

    function( ajax, notify ) {
        
        this.getProfileData = function() {
            return ajax.get( "me" );
        };

        this.updateProfileData = function( profileData ) {
            return ajax.put( "me", profileData );
        };

        this.changePassword = function( oldPassword, newPassword, confirmPassword ) {
            var data = {
                "oldPassword": oldPassword,
                "newPassword": newPassword,
                "confirmPassword": confirmPassword
            };
            return ajax.put( "me/ChangePassword", data );
        };

        this.getFriends = function( isPreview ) {
            var url = "me/friends";
            url += isPreview ? "/preview" : "";
            return ajax.get( url );
        };

        this.getFeed = function( start, count ) {
            var url = "me/feed?StartPostId=&PageSize=" + count;
            return ajax.get( url );
        };

        this.getFriendRequests = function() {
            return ajax.get( "me/requests" );
        };

        this.updateFriendRequest = function( requestId, status ) {
            var url = "me/requests/" + requestId + "?status=" + status;
            return ajax.put( url );
        };

        this.sendFriendRequest = function( username ) {
            return ajax.post( "me/requests/" + username );
        };
}]);