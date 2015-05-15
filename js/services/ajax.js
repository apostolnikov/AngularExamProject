app.service( "ajax", [ "$http", function( $http ) {
    var SERVER_URL = "http://softuni-social-network.azurewebsites.net/api/";

    this.token = null;
    this.onUnauthorized = jQuery.noop;

    this.post = function( url, data ) {
        return this.ajax( url, "post", data );
    };

    this.get = function( url ) {
        return this.ajax( url, "get", undefined );
    };

    this.put = function( url, data ) {
        return this.ajax( url, "put", data );
    };

    this.delete = function( url ) {
        return this.ajax( url, "delete", undefined );
    };

    this.ajax = function( url, method, data ) {
        var headers = {},
            self = this;

        if ( this.token ) {
            headers.Authorization = this.token[ "token_type" ] + " " + this.token[ "access_token" ];
        }

        return $http({
            method: method,
            url: SERVER_URL + url,
            data: data,
            headers: headers
        })
        .error(function( data, status, func, xhr ) {
            if ( status === 401 ) self.onUnauthorized( data, status, func, xhr );
        });
    };
}]);