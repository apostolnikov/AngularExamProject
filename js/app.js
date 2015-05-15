"use strict";

var app = angular.module( "SoftuniSocialNetwork", [ "ngRoute" ] )

.config(function( $routeProvider, $locationProvider ) {
    $routeProvider
        .when( "/", {
            templateUrl: "views/home.html",
            controller: "HomeViewModel"
        })
        .when( "/login", {
            templateUrl: "views/login.html",
            controller: "UserAuthenticationViewModel"
        })
        .when( "/edit", {
            templateUrl: "views/edit.html",
            controller: "EditProfileViewModel"
        })
        .when( "/profile/:username", {
            templateUrl: "views/profile.html",
            controller: "ProfileViewModel"
        })
        .otherwise( { redirectTo: "/" } );
})

.directive( "ngMatch", [ "$parse", function( $parse ) {
    var directiveId = "ngMatch";
    var directive = {
        link: link,
        restrict: 'A',
        require: '?ngModel'
    };
    return directive;
 
    function link(scope, elem, attrs, ctrl) {
        // if ngModel is not defined, we don't need to do anything
        if (!ctrl) return;
        if (!attrs[directiveId]) return;
 
        var firstPassword = $parse(attrs[directiveId]);
 
        var validator = function (value) {
        var temp = firstPassword(scope),
        v = value === temp;
        ctrl.$setValidity('match', v);
        return value;
        }
 
        ctrl.$parsers.unshift(validator);
        ctrl.$formatters.push(validator);
        attrs.$observe(directiveId, function () {
        validator(ctrl.$viewValue);
        });
 
    }
}])

.run( [ "$rootScope", "$location", "userRepository", function( $rootScope, $location, userRepository ) {
    

    $rootScope.$on( "$routeChangeStart", function() {
        //if ( !user.isLoggedIn ) {
        //    $location.path( "/login" );
        //} else if ( $location.path() === "/login" ) {
        //    $location.path( "/" );
        //}
    });
}]);