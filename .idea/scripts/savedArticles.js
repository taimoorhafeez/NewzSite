$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $(".welcome").append("<h1 align='center'> Welcome " + user.email + "</h1>");
            let db = firebase.firestore();
            db.collection(user.uid).get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let author = doc.data().author;
                    let imageURL = doc.data().imageURL;
                    let link = doc.data().link;
                    let source = doc.data().source;
                    let title = doc.data().title;

                    console.log(doc.data());

                    if (imageURL === null || imageURL === "null" || imageURL === undefined) {
                        imageURL = "images/noImage.png"
                    }
                    if (author === null) {
                        author = "";
                    }
                    $(".row").append("<div class='col-lg-4'><div class = 'card h-100 card-body' style='margin-bottom: 20px; " +
                        "margin-left: 5px; margin-right: 5px; height: calc(100% - 15px);'>" +
                        "<img src=" + imageURL + " class='card-img-top img-fluid' style='width: 40vw; height: 20vw;'> " +
                        "<div class='card-block'><a class='card-title' href=" + link + ">" + title + "</a>" +
                        "<p class='card-author'>" + author + "</p></div></div></div>");
                });
            });
        } else {
            alert("You are not logged in");
            window.location.replace("login.html");
        }
    });
});