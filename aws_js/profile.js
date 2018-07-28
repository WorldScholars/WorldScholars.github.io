/*global WorldScholars _config*/

var WorldScholars = window.WorldScholars || {};
WorldScholars.map = WorldScholars.map || {};

(function profileScopeWrapper($) {
    var authToken;
    WorldScholars.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    function requestProfile() {
        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/getProfile',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                PickupLocation: {
                    Latitude: pickupLocation.latitude,
                    Longitude: pickupLocation.longitude
                }
            }),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error getting profile: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when requesting your profile:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {
        console.log('Response received from API: ', result);
        var useremail = document.getElementById('useremail');
        useremail.innerHTML = result.ProfileInfo.email;
    }

    $(function onDocReady() {
        // register handler for signout click
        $('#signOut').click(function() {
            WorldScholars.signOut();
            alert("You have been signed out.");
            window.location = "signin.html";
        });
   
        // get profile
        //requestProfile();
        var useremail = document.getElementById('useremail');
        useremail.innerHTML = WorldScholars.user;
        
    });

}(jQuery));
