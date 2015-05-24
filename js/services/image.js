app.service( "image", function() {
    "use strict";
    var BASE64_REGEX_PATTERN = /^data:image\/(.+?);base64,(.+)$/i;

    this.convertToBase64 = function( file, callback ) {
        var fileReader = new FileReader();

        fileReader.onloadend = function() {
            callback( fileReader.result );
        }

        if ( file ) {
            fileReader.readAsDataURL( file );
        } else {
            callback( null );
        }
    };

    this.extractBase64Data = function( base64 ) {
        var result = BASE64_REGEX_PATTERN.exec( base64 );
        return result == null ? null : result[ 2 ];
    };

    this.appendBase64Header = function( base64 ) {
        if ( BASE64_REGEX_PATTERN.exec( base64 ) ) {
            return base64;
        } else if ( !base64 ) {
            return null;
        } else {
            return "data:image/jpg;base64," + base64;
        }
    };
});