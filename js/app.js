"use strict";

var app = angular.
    module("SoftuniSocialNetwork", ["ngRoute", "ngResource"]).
    config(function ($routeProvider) {
        $routeProvider.
            when("/", {
                templateUrl: "views/home.html",
                controller: "HomeViewModel"
            }).
            when("/edit", {
                templateUrl: "views/edit.html",
                controller: "EditProfileViewModel"
            }).
            when("/profile/:username", {
                templateUrl: "views/profile.html",
                controller: "ProfileViewModel"
            }).
            otherwise({ redirectTo: "/" });
    }).
    constant("SERVER_URL", "http://softuni-social-network.azurewebsites.net/api/").
    directive("ngMatch", ["$parse", function ($parse) {
        var directiveId = "ngMatch",
            directive = {
                link: link,
                restrict: 'A',
                require: '?ngModel'
            };

        return directive;

        function link(scope, element, attributes, ctrl) {
            if (!ctrl) return;
            if (!attributes[directiveId]) return;

            var firstPassword = $parse(attributes[directiveId]);

            ctrl.$parsers.unshift(validator);
            ctrl.$formatters.push(validator);
            attributes.$observe(directiveId, function () {
                validator(ctrl.$viewValue);
            });

            function validator(value) {
                var temp = firstPassword(scope),
                    v = value === temp;

                ctrl.$setValidity("match", v);
                return value;
            }
        }
    }]).
    run([
        "$rootScope", "$location", "user",

        function ($rootScope, $location, user) {
            $rootScope.$on("$routeChangeStart", function () {
                if (!user.isLogged) {
                    //$location.path("#/");
                }
            });

            jQuery(document).on("loggedOut.user", function () {
                //$location.path("#/");
            });
        }
    ]);