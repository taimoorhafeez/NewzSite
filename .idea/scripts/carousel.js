
$(document).ready(function () {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=f11bdd5aaeaa46ed8f91cad909e6a604');
    request.onload = function () {
        // Begin accessing JSON data here
        let data = JSON.parse(this.response);

        let author = "";
        let image = "";

        for (let i = 0; i < 3; i++) {
            if (data.articles[i].author === null) {
                author = "";
            } else author = data.articles[i].author;
            if (data.articles[i].urlToImage === null || data.articles[i].urlToImage === 'null') {
                image = "images/noImage.png"
            } else image = data.articles[i].urlToImage;
            $('<div class="carousel-item"><img class="img-fluid" src="' + image + '" style= ' +
                '"width: 60vw; height: 30vw;"><div class="carousel-caption"><h5><a href=' + data.articles[i].url +
                ' style = "color:white">' + data.articles[i].title + '</a></h5><p>' + author + '</p></div> </div>').appendTo('.carousel-inner');
            $('<li data-target="#carousel" data-slide-to="' + i + '"></li>').appendTo('.carousel-indicators');
        }
        $('.carousel-item').first().addClass('active');
        $('.carousel-indicators > li').first().addClass('active');
        $('#carousel').carousel();
    };
    request.send();
});