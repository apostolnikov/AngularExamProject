"use strict";

app.service( "userRepository",
[
    "$location", "ajax", "notify",

    function( $location, ajax, notify ) {
        var userRepo = this;

        this.user = {};

        if ( localStorage.user && localStorage.token ) {
            this.user = JSON.parse( localStorage.user );
            this.user.isLoggedIn = true;
            ajax.token = JSON.parse( localStorage.token );
        } else {
            reset();
        }

        // Public functions
        this.login = function( loginData ) {
            ajax
                .post( "users/Login", loginData )
                .success( onAuthenticated )
                .error( notify.error );
        };

        this.register = function( registerData ) {
            ajax
                .post( "users/Register", registerData )
                .success( onAuthenticated )
                .error( notify.error );
        };

        this.logout = function() {
            ajax
                .post( "users/Logout" )
                .success(function() {
                    reset();
                    $location.path( "/login" );
                })
                .error( notify.error );
        };

        this.getUserData = function( username, isPreview ) {
            var url = "users/" + username;
            url += isPreview ? "/preview" : "";
            return ajax.get( url );
        };

        this.searchUsers = function( searchTerm ) {
            var url = "users/search?searchTerm=" + searchTerm;
            return ajax.get( url );
        };

        this.getUserWallData = function( username, count, start ) {
            var url = "users/" + username +
                "/wall?StartPostId=" + start + "&PageSize=" + count;
            return ajax.get( url );
        };

        this.getUserFriends = function( username, isPreview ) {
            var url = "users/" + username + "/friends";
            url += isPreview ? "/preview" : "";
            return ajax.get( url );
        };
        
        // Private stuff
        function reset() {
            userRepo.user.isLoggedIn = false;
            ajax.token = null;
            localStorage.clear();
        }

        function onAuthenticated( response ) {
            ajax.token = {
                "token_type": response[ "token_type" ],
                "access_token": response[ "access_token" ]
            };
            localStorage.token = JSON.stringify( ajax.token );

            ajax.get( "me" ).error( notify.error )
                .success(function( userData ) {
                    angular.extend( userRepo.user, userData );
                    userRepo.user.isLoggedIn = true;
                    localStorage.user = JSON.stringify( userData );
                    $location.path( "/" );
                });
        }
   
        ajax.onUnauthorized = function( data, status, func, xhr ) {
            if ( xhr.url.endsWith( "Logout" ) ) {
                reset();
                $location.path( "/login" );
            } else {
                userRepo.logout();
            }
        };
}]);