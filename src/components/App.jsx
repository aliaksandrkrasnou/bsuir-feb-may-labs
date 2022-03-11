import { useEffect, useState } from 'react';
import { NewsCard } from './NewsCard';
import NewsService from "../services/NewsService";

function App() {

  const [currentSource, setCurrentSource] = useState(NewsService.source);
  const [articles, setArticles] = useState(NewsService.articles);
  const [sources, setSources] = useState(NewsService.sources);
  const [query, setQuery] = useState(NewsService.currentQuery);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    NewsService.loadSources().then(() => {
      setSources(NewsService.sources);
      return loadArticles();
    });
  }, []);

  function loadArticles() {
    setIsActive(false);
    return NewsService.loadArticles().then(() => {
      setArticles(NewsService.articles);
      setIsActive(true);
    });
  }

  function handleSourceChange(event) {
    NewsService.currentSource = event.target.value;
    setCurrentSource(event.target.value);

    NewsService.clearArticles();
    loadArticles();
  }

  function handleChangeQuery(event) {
    NewsService.currentQuery = event.target.value;
    setQuery(event.target.value);
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

  return (
    <div className="app">
      <header className="header">
        <p>News Feed</p>
      </header>
      <form className="search-form" onSubmit={handleFormSubmit} disabled={!isActive}>
        <div className="search-form__container">
          <div>
            <input type="text" value={query} onChange={handleChangeQuery} />
            <input type="submit" value="Search" />
          </div>
          <select value={currentSource} onChange={handleSourceChange}>
            {sources && sources.map(source => {
              return (<option key={source.id} value={source.id}>{source.name}</option>);
            })}
          </select>
        </div>
      </form>
      <main>
        <ul className="cards" >
          {articles && articles.map(article => {
            return <li key={article.url} className="cards__item">
              <NewsCard article={article} />
            </li>
          })}
          {articles && articles.length < 1 && <p className="cards__empty">Articles not found. Clear search and try again</p>}
          
          {!articles && <p className="cards__empty">Requests from the browser are not allowed on the Developer plan, except from localhost.</p>}
        </ul>
        <div className="cards__more">
          <button className="cards__more-button" type="button" onClick={handleButtonClick} disabled={!isActive}>Load more...</button>
        </div>
      </main>
    </div>
  );
}

export default App;
