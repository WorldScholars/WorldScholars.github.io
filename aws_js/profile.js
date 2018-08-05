/*global WorldScholars _config*/

var WorldScholars = window.WorldScholars || {};
WorldScholars.map = WorldScholars.map || {};

(function profileScopeWrapper($) {
    var authToken;
    WorldScholars.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            if (window.location.pathname != "/signin.html" && window.location.origin != "file://"){
                window.location.href = '/signin.html';
            }
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    function listExams() {

        $.ajax({
            method: 'GET',
            url: _config.api.invokeUrl + '/examlist',
            headers: {
                Authorization: authToken
            },
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                console.error('Error reading exams from database: ', textStatus, ', Details: ', errorThrown);
                console.error('Response: ', jqXHR.responseText);
                alert('An error occured when reading your exam\n' + jqXHR.responseText);
            }
        });
    }

    function listExamsInHtml(allExams) {
        console.log(allExams);
        allExams.forEach(function(oneExam){
          //TODO hardcoding parsing of section and question, this should just be in the json object
          slash = "/";
          if (ans.value!="0.00"){
            newRow = ('<tr><td>' + oneExam.ExamNumber + '<'+slash+'td><td>' + oneExam.submitTime + '<'+slash+'td>'+
                '<td> <a href=\"/examsummary.html?id=' + oneExam.ExamId + '\">Results<'+slash+'</a>'+'<'+slash+'td><'+slash+'tr>');
            $('tbody').append(newRow);
          }
        });


    }

    $(function onDocReady() {
        //TODO figure out how to split this into multiple files 
        if (window.location.pathname=="/profile.html"){
          var useremail = document.getElementById('username');
          listExams()
          useremail.innerHTML = WorldScholars.user.username;
        }

        // register handler for signout click
        $('#signOut').click(function() {
            WorldScholars.signOut();
            alert("You have been signed out.");
            window.location = "signin.html";
        });
  
        
    });

}(jQuery));
