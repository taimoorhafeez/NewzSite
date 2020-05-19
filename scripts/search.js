var searchQuery = new URLSearchParams(window.location.search).get('search');

function createCardHTML(article) {
    const {
        title,
        content,
        publishedAt,
        urlToImage,
        url
    } = article;
    return (`
        <div class="card myCard" style="width: 100%;">
          <img src=${urlToImage} class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-publishedAt">${publishedAt}</p>
            <p class="card-text">${content.slice(0, -15)} ...</p>
            <a target="_blank" href="${url}" class="card-link">Read More</a>
            </div>
        </div>
    `);
}

$(".removeDefaultSubmit").submit(function (e) {
    return false;
});

document.getElementById("formIDD").addEventListener("submit", function (event) {
    event.preventDefault();
    const selectedCategory = $("#categorySelect option:selected").text();
    const selectedSource = $("#sourceSelect option:selected").text();
    const pageSize = $("#pageSizeSelect option:selected").text();
    const URL = `https://newsapi.org/v2/everything?sources=${selectedSouce}&q=${inputValue}&apiKey=${CONSTANTS.NEWS_API_KEY}&pageSize=100`;

});

$(document).ready(async function() {
    const URL = `https://newsapi.org/v2/sources?apiKey=${CONSTANTS.NEWS_API_KEY}&category=general`;
    const response = await fetch(URL);
    const myJson = await response.json();
    const { sources } = myJson;
    sources.forEach(source => {
        let optHTML = `<option value="${source.id}">${source.name}</option>`;
        $("#sourceSelect").append(optHTML);
    });
})


$("#categorySelect").change(async function() {
    const selectedOpt = $("#categorySelect option:selected").val();
    const URL = `https://newsapi.org/v2/sources?apiKey=${CONSTANTS.NEWS_API_KEY}&category=${selectedOpt}`;
    const response = await fetch(URL);
    const myJson = await response.json();
    const { sources } = myJson;
    sources.forEach(source => {
        let optHTML = `<option value="${source.id}">${source.name}</option>`;
        $("#sourceSelect").append(optHTML);

    });
});
const searchNewsApi = async function (argumentPassed) {
    $("#searchContainer").empty();

    let inputValue = $("#searchPageInput").val();
    if (!inputValue) {
        inputValue = searchQuery;
    }
    if (!inputValue) {
        inputValue = "";
    }
    const selectedCategory = $("#categorySelect option:selected").val();
    const selectedSource = $("#sourceSelect option:selected").val();
    const pageSize = $("#pageSizeSelect option:selected").val();
    const fromValue = $("#fromDate").val();
    const toValue = $("#toDate").val();
    inputValue = inputValue + " " + selectedCategory;
    let URL = `https://newsapi.org/v2/everything?q=${inputValue}&apiKey=${CONSTANTS.NEWS_API_KEY}&pageSize=${pageSize}`;
    if (!URL) {
        URL += `&sources=${ selectedSource }`;
    }
    if(fromValue) {
        URL += `&from=${fromValue}`;
    }
    if (toValue) {
        URL += `&to=${toValue}`;
    }
    const response = await fetch(URL);
    const myJson = await response.json();
    const {
        articles
    } = myJson;
    console.log(myJson);
    let i = 0;
    while (i < articles.length) {
        let numColumns = Math.floor(Math.random() * 5 + 3);
        let rowHTML = "<div class='row'>";
        rowHTML += (`<div class='col'>`);
        rowHTML += (createCardHTML(articles[i]));
        rowHTML += (`</div>`);

        if (articles[i + 1] && numColumns > 1) {
            rowHTML += (`<div class='col'>`)
            const cardHTML = createCardHTML(articles[i + 1]);
            rowHTML += (cardHTML);
            rowHTML += (`</div>`);
        }

        if (articles[i + 2] && numColumns > 2) {
            rowHTML += (`<div class='col'>`)
            const cardHTML = createCardHTML(articles[i + 2]);
            rowHTML += (cardHTML);
            rowHTML += (`</div>`);
        }

        if (articles[i + 3] && numColumns > 3) {
            rowHTML += (`<div class='col'>`)
            const cardHTML = createCardHTML(articles[i + 3]);
            rowHTML += (cardHTML);
            rowHTML += (`</div>`);
        }

        i += numColumns;
        rowHTML += ('</div>');
        $("#searchContainer").append(rowHTML);

    }
    for (let i = 0; i < articles.length; i = i + 4) {

        let rowHTML = "<div class='row'>";
        rowHTML += (`<div class='col'>`);
        rowHTML += (createCardHTML(articles[i]));
        rowHTML += (`</div>`);

        if (articles[i + 1]) {
            rowHTML += (`<div class='col'>`)
            const cardHTML = createCardHTML(articles[i + 1]);
            rowHTML += (cardHTML);
            rowHTML += (`</div>`);
        }

        if (articles[i + 2]) {
            rowHTML += (`<div class='col'>`)
            const cardHTML = createCardHTML(articles[i + 2]);
            rowHTML += (cardHTML);
            rowHTML += (`</div>`);
        }

        rowHTML += ('</div>');
        $("#searchContainer").append(rowHTML);

    }
};

$("#searchBtn").click(searchNewsApi);

if (searchQuery) {
    searchNewsApi();
}