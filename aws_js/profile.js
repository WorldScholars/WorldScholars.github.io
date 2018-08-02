/*global WorldScholars _config*/

var WorldScholars = window.WorldScholars || {};
WorldScholars.map = WorldScholars.map || {};

(function profileScopeWrapper($) {
    var authToken;
    WorldScholars.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            if (window.location.pathname != "/signin.html"){
                window.location.href = '/signin.html';
            }
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    $(function onDocReady() {
        // register handler for signout click
        $('#signOut').click(function() {
            WorldScholars.signOut();
            alert("You have been signed out.");
            window.location = "signin.html";
        });
  
        //TODO figure out how to split this into multiple files 
        if (window.location.pathname=="/profile.html"){
          var useremail = document.getElementById('username');
          useremail.innerHTML = WorldScholars.user.username;
        }
        
    });

}(jQuery));
