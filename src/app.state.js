import { Article } from './models/article.model';

const apiKey = '7debb41cee124745a8ae038e063e65c0';

class AppState {
  constructor() {
    this.pageSize = 5;
    this.articles = [];
    this.totalResults = 0;
    this.source = '';
    this.searchQuery = '';
    this.category = '';
    this.country = '';
    this.language = 'en';
  }

  addArticles(data) {
    this.totalResults = data.totalResults || 0;
    this.articles = this.articles.concat(data.articles.map((item) => new Article(item)));
  }

  resetArticles() {
    this.articles = [];
  }

  getNextUrl() {
    const page = Math.floor(appState.articles.length / appState.pageSize) + 1;
    let url = `https://newsapi.org/v2/top-headlines?`;
    const params = [`language=${this.language}`, `page=${page}`, `pageSize=${this.pageSize}`, `apiKey=${apiKey}`];
    if (this.searchQuery) {
      params.push(`q=${this.searchQuery}`);
    }
    if (this.category) {
      params.push(`category=${this.category}`);
    }
    if (this.country) {
      params.push(`country=${this.country}`);
    }

    return `${url}${params.join('&')}`;
  }
}

export const appState = new AppState();
