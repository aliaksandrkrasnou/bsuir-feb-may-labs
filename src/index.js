import "./style.css"
import _ from 'lodash';
import NewsService from './services/NewsService';

const sourcesTemplate = _.template(`
    <% _.forEach(sources, function(source) { %>
        <option value="<%- source.id %>">
            <%- source.name %>
        </option>
    <% }); %>
`);

const articleTemplate = _.template(`
    <li class="cards__item">
        <section class="card">
            <img class="card__image" src="<%-article.urlToImage%>" alt="" />
            <h3 class="card__header"><%-article.title%></h3>
            <p class="card__description"><%-article.description%></p>
            <p class="card__author"><%-article.author%></p>
            <span class="card__source"><%-article.source.name%></span>
        </section>
    </li>
`);

function InitializeApp() {

    const searchForm = document.querySelector("#search-form");
    const searchQuery = document.querySelector("#search-query");
    const loadMoreBtn = document.querySelector("#load-more-btn");

    const sources = document.querySelector("#sources");
    const articles = document.querySelector("#articles");
    const articlesEmpty = document.querySelector("#articles-empty");

    function loadArticles() {
        return NewsService.loadArticles().then(() => {
            articlesEmpty.style.display = NewsService.articles.length > 0 ? "none" : "block";
            loadMoreBtn.style.display = NewsService.articles.length > 0 ? "inline-block" : "none";
            renderArticles();
        });
    }

    function handleSourceChange(event) {
        NewsService.currentSource = event.target.value;

        NewsService.clearArticles();
        loadArticles();
    }

    function handleChangeQuery(event) {
        NewsService.currentQuery = event.target.value;
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        NewsService.clearArticles();
        loadArticles();
    }

    function handleButtonClick(event) {
        event.preventDefault();

        NewsService.currentPage += 1;
        loadArticles();
    }

    searchForm.addEventListener('submit', handleFormSubmit);
    loadMoreBtn.addEventListener('click', handleButtonClick);
    sources.addEventListener('change', handleSourceChange);
    searchQuery.addEventListener('change', handleChangeQuery);

    NewsService.loadSources().then(() => {
        renderSources();
        return loadArticles();
    });

    function renderSources() {
        const template = sourcesTemplate({ sources: NewsService.sources });
        sources.insertAdjacentHTML("beforeend", template);
    }

    function renderArticles() {
        articles.innerHTML = "";
        NewsService.articles.forEach(article => {
            const template = articleTemplate({ article });
            articles.insertAdjacentHTML("beforeend", template);
        });
    }
}



window.onload = function () {
    InitializeApp();
};