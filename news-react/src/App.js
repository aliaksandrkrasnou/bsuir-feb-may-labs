import React from "react";
import { css } from "emotion";
import "./App.css";

const API_KEY = "751da822d3b942139f6d2246e1661781";

function fetchNews(query) {
  return fetch(
    `https://newsapi.org/v2/everything?q=${query}&from=05-26-2019&sortBy=publishedAt&apiKey=${API_KEY}`
  ).then(r => r.json());
}

const buttonCss = css`
  padding: 0;
  border: 1px solid black;
  border-radius: 7px;
  padding: 7px;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  vertical-align: middle;
`;

const cardListStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  grid-gap: 1.5rem;
`;

const cardStyle = css`
  border: 1px solid black;
  border-radius: 7px;
`;

const cardImgStyle = css`
  border-radius: 7px 7px 0 0;
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

function Card({ article }) {
  return (
    <li className={cardStyle}>
      <div
        className={css`
          height: 10rem;
        `}
      >
        <img className={cardImgStyle} src={article.urlToImage} alt="" />
      </div>
      <div>
        <h2>
          <a href={article.url}>${article.title}</a>
        </h2>
        <p>{article.description}</p>
        <small>{article.author || ""}</small>
      </div>
    </li>
  );
}

function ArticleSourceItem({ sourceName, selected, onChange }) {
  return (
    <div>
      <input
        name={sourceName}
        type="checkbox"
        checked={selected}
        onChange={onChange}
      />
      <label htmlFor={sourceName}>{sourceName}</label>
    </div>
  );
}

const initialState = {
  sources: {},
  articles: [],
  amountOfDisplayedArticles: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ARTICLES":
      const { articles } = action;
      return {
        ...state,
        articles: articles,
        amountOfDisplayedArticles: 5
      };
    case "SHOW_MORE_ARTICLES":
      const amountOfDisplayedArticles = state.amountOfDisplayedArticles + 5;
      return {
        ...state,
        amountOfDisplayedArticles
      };
    case "SET_SOURCES":
      return {
        ...state,
        sources: action.sources
      };
    case "TOGGLE_SOURCE":
      return {
        ...state,
        amountOfDisplayedArticles: 5,
        sources: {
          ...state.sources,
          [action.source]: !state.sources[action.source]
        }
      };
    default:
      throw new Error();
  }
}

function App() {
  const [query, setQuery] = React.useState("auto");
  const [queryInputValue, setQueryInputValue] = React.useState(query);

  const [
    { sources, articles, amountOfDisplayedArticles },
    dispatch
  ] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    (async () => {
      const { articles } = await fetchNews(query);
      let sources = {};
      articles.forEach(article => (sources[article.source.name] = false));
      dispatch({ type: "SET_ARTICLES", articles });
      dispatch({ type: "SET_SOURCES", sources });
    })();
  }, [query]);

  const filteredArticles = articles.filter(
    article => sources[article.source.name]
  );
  const displayShowMoreButton =
    filteredArticles.length > amountOfDisplayedArticles;

  return (
    <div>
      <div>
        <input
          value={queryInputValue}
          onChange={e => setQueryInputValue(e.target.value)}
        />
        <button className={buttonCss} onClick={() => setQuery(queryInputValue)}>
          Search
        </button>
      </div>
      <div>
        {Object.entries(sources).map(([sourceName, selected], idx) => (
          <ArticleSourceItem
            sourceName={sourceName}
            selected={selected}
            key={idx}
            onChange={() =>
              dispatch({ type: "TOGGLE_SOURCE", source: sourceName })
            }
          />
        ))}
      </div>
      <ul className={cardListStyle}>
        {filteredArticles
          .slice(0, amountOfDisplayedArticles)
          .map((article, idx) => (
            <Card article={article} key={idx} />
          ))}
      </ul>
      {displayShowMoreButton && (
        <button onClick={() => dispatch({ type: "SHOW_MORE_ARTICLES" })}>
          Show more
        </button>
      )}
    </div>
  );
}

export default App;
