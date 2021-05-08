import { appState } from '../app.state';
import { ArticleView } from '../views/article.view';
import { NoDataView } from '../views/no-data.view';

export class ArticlesController {
  constructor(maxArticlesCount = 40) {
    this.maxArticlesCount = maxArticlesCount;
    this.elements = {
      content: document.querySelector('#content'),
      loadMore: document.querySelector('.load-more-btn'),
      filterSubmit: document.querySelector('#filterSubmit'),
      filterValue: document.querySelector('#filterValue'),
      category: document.querySelector('select[name="category"]'),
      language: document.querySelector('select[name="language"]'),
      country: document.querySelector('select[name="country"]'),
    };
  }

  setupListeners() {
    this.elements.loadMore.addEventListener('click', (e) => this.getNewData(e));
    this.elements.filterSubmit.addEventListener('click', (e) => this.onFilterSubmit(e));
    this.elements.filterValue.addEventListener('change', (e) => this.onFilterValueChange(e));
    this.elements.category.addEventListener('change', (e) => this.onCategoryChange(e));
    this.elements.language.addEventListener('change', (e) => this.onLanguageChange(e));
    this.elements.country.addEventListener('change', (e) => this.onCountryChange(e));
  }

  hasMoreResults() {
    return appState.articles.length < this.maxArticlesCount && appState.articles.length < appState.totalResults;
  }

  getNewData() {
    this.elements.loadMore.classList.toggle('hidden');

    const url = appState.getNextUrl();
    return fetch(url, { mode: 'cors' })
      .then((res) => res.json())
      .then((data) => {
        appState.addArticles(data);
        this.elements.loadMore.classList.toggle('hidden');
        this.updateView();
      });
  }

  updateView() {
    const { articles } = appState;
    this.elements.content.innerHTML =
      articles.length === 0 ? new NoDataView().render() : new ArticleView(articles).render();

    if (!this.hasMoreResults()) {
      this.elements.loadMore.classList.toggle('hidden');
    }
  }

  onFilterValueChange(e) {
    appState.searchQuery = e.target.value;
  }

  onCategoryChange(e) {
    appState.category = e.target.value;
  }

  onLanguageChange(e) {
    appState.language = e.target.value;
  }

  onCountryChange(e) {
    appState.country = e.target.value;
  }

  onFilterSubmit(e) {
    e.preventDefault();
    appState.resetArticles();
    return this.getNewData();
  }
}
