firebase.auth().onAuthStateChanged(function (user){
    if(user){
        $('#loggedIn').show()
    }
    else {
        $('#login').show()
    }
});