"use strict";

app.factory("user", ["SERVER_URL", "notify", "$resource", "$http",

    function (SERVER_URL, notify, $resource, $http) {
        var plainUser,
            loggedInUser,
            foundUsers,
            selectedUserProfile = {};

        var User = $resource(SERVER_URL + "users/:action/:secondParam", { action: "", secondParam: "" },
        {
            "login": {
                method: 'POST',
                params: { action: "Login" },
                interceptor: { response: onAuthenticated, responceError: onError }
            },
            "register": {
                method: "POST",
                params: { action: "Register" },
                interceptor: { response: onAuthenticated, responceError: onError }
            },
            "logout": {
                method: "POST",
                //headers: headers,
                params: { action: "Logout" },
                interceptor: { response: clearAuthenticationData, responseError: onError }
            }
        });

        if (sessionStorage.user) {
            plainUser = JSON.parse(sessionStorage.user);
        } else if (localStorage.user) {
            plainUser = JSON.parse(localStorage.user);
        } else {
            plainUser = { isLogged: false };
        }

        loggedInUser = new User(plainUser);

        if (sessionStorage.user || localStorage.user) {
            onAuthenticated();
        }

        return {
            get loggedInUser() {
                return loggedInUser;
            },
            get selectedUserProfile() {
                return selectedUserProfile;
            },
            get foundUsers() {
                return foundUsers;
            },
            loadUserProfile: function (username, isPreview) {
                selectedUserProfile = User.get({
                    action: username,
                    secondParam: isPreview ? "isPreview" : undefined
                });
            },
            searchUsers: function (searchTerm) {
                if (searchTerm === "") return;

                foundUsers = User.query({
                    action: "search",
                    searchTerm: searchTerm
                });
            }
        };

        // Private stuff
        function onError() {
            console.log(arguments);
        }

        function clearAuthenticationData() {
            delete localStorage.user;
            delete sessionStorage.user;
            delete headers.Authorization;

            // Clear custom properties
            Object.keys(loggedInUser).forEach(function (property) {
                if (!property.startsWith("$")) delete loggedInUser[property];
            });
        }

        function onAuthenticated() {
            delete loggedInUser.password;

            if (loggedInUser.rememberMe) {
                localStorage.user = JSON.stringify(loggedInUser);
            } else {
                sessionStorage.user = JSON.stringify(loggedInUser);
            }

            
            loggedInUser.isLogged = true;
            $http.defaults.headers.common['Authorization'] = loggedInUser["token_type"] + " " + loggedInUser["access_token"];
            //user.$load();
        }
    }]);