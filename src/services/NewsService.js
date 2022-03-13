class NewsService {

    sourcesUri = "https://newsapi.org/v2/top-headlines/sources";
    articlesUri = "https://newsapi.org/v2/everything";
    apiKey = "9c66de5a8c374e959f3217e6b3b5c450";

    language = "en";
    pageSize = 6;

    currentQuery = "";
    currentSource = "bbc-news";
    currentPage = 1;

    sources = [];
    articles = [];

    get articleParams() {
        return {
            page: this.currentPage,
            q: this.currentQuery,
            sources: this.currentSource,

            pageSize: this.pageSize,
            language: this.language,
            apiKey: this.apiKey
        };
    }

    clearArticles() {
        this.articles = [];
        this.currentPage = 1;
    }

    loadSources() {
        return this.fetch(this.sourcesUri, { apiKey: this.apiKey }).then(({ sources }) => {
            this.sources = sources;
        });
    }

    loadArticles() {
        return this.fetch(this.articlesUri, this.articleParams)
            .then(({ articles }) => {
                if (articles) {
                    this.articles = this.articles.concat(articles);
                }
            });
    }

    fetch(uri, params = {}) {
        let url = new URL(uri);
        url.search = new URLSearchParams(params).toString();

        return fetch(url).then(response => response.json());
    }
}
const instance = new NewsService();

export default instance;