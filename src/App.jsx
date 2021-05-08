import React from 'react';
import { Input, Select, SubmitButton } from './components/filters';
import { categoryOptions, countryOptions, languageOptions } from './lib/options.const';
import { Article } from './components/Article';
import { fetchArticles } from './lib/api';
import { articleTransformer } from './components/Article/Article.transformer';

export const App = () => {
  const [state, setState] = React.useState({
    pageSize: 5,
    articles: [],
    totalResults: 0,
    source: '',
    searchQuery: '',
    category: '',
    country: '',
    language: languageOptions[0].value,
    isSubmitting: false,
  });

  const { articles, isSubmitting, pageSize, language, searchQuery, category, country } = state;

  const onFieldChange = (fieldName) => (value) => setState((prevState) => ({ ...prevState, [fieldName]: value }));

  const getArticles = (resetArticles = false) => {
    setState((prevState) => ({ ...prevState, isSubmitting: true }));
    const page = Math.floor(articles.length / pageSize) + 1;
    fetchArticles({ page, pageSize, language, searchQuery, category, country })
      .then((data) => {
        let updArticles = [];
        console.log(resetArticles)
        if (resetArticles) {
          updArticles = data.articles.map(articleTransformer);
        } else {
          updArticles = [].concat(articles, data.articles.map(articleTransformer));
        }

        setState((prevState) => ({
          ...prevState,
          totalResults: data.totalResults,
          articles: updArticles,
          isSubmitting: false,
        }));
      })
      .catch((e) => {
        console.error(e);
        setState((prevState) => ({ ...prevState, isSubmitting: false }));
      });
  };

  const onSubmit = () => {
    getArticles(true);
  };

  React.useEffect(() => {
    // did mount
    getArticles();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <header>
        <h1>PewNews</h1>
      </header>
      <div className="sub-nav">
        <div className="filter">
          <form id="filterForm" noValidate="" className="filters-form">
            <fieldset>
              <Input
                onChange={onFieldChange('searchQuery')}
                fieldName="searchQuery"
                label="Search query:"
                placeholder="Filter"
              />
              <Select
                onChange={onFieldChange('category')}
                fieldName="category"
                label="Category:"
                options={categoryOptions}
              />
              <Select
                onChange={onFieldChange('language')}
                fieldName="language"
                label="Language:"
                options={languageOptions}
              />
              <Select
                onChange={onFieldChange('country')}
                fieldName="country"
                label="Country:"
                options={countryOptions}
              />
              <SubmitButton onSubmit={onSubmit} />
            </fieldset>
          </form>
        </div>
      </div>
      <div className="sub-header">News</div>

      <div id="content">
        {articles.map((article, index) => (
          <Article key={`${index}-${article.url}`} article={article} />
        ))}
      </div>

      {!isSubmitting && (
        <div className="load-more-btn" onClick={() => getArticles(false)}>
          Load More
        </div>
      )}
      {isSubmitting && <div className="loading-text">...</div>}

      <footer>
        <p className="copyright">
          Copyright{' '}
          <a href="https://newsapi.org" target="_blank" rel="noreferrer">
            NewsAPI
          </a>
        </p>
      </footer>
    </div>
  );
};
