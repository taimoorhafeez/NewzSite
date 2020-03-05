let app = document.getElementById('root');


let request = new XMLHttpRequest();
request.open('GET', 'https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=f11bdd5aaeaa46ed8f91cad909e6a604', true);
request.onload = function () {

    // Begin accessing JSON data here
    let data = JSON.parse(this.response);
    let articleList = data.articles;

    articleList.forEach(article => {

        let articleTitle = document.createElement('h1')
        articleTitle.textContent = article.title;

        let articleDate = document.createElement('p')
        articleDate.textContent = article.publishedAt;

        let articleContent = document.createElement('p')
        articleContent.textContent = article.content;

        let articleURL = document.createElement('a');
        articleURL.textContent = 'Link to Article';
        articleURL.href = article.url;

        let articleImage = document.createElement('img');
        articleImage.src = article.urlToImage;

        app.appendChild(articleTitle);
        app.appendChild(articleDate);
        app.appendChild(articleImage);
        app.appendChild(articleContent);
        app.appendChild(articleURL);

    });
};

request.send();