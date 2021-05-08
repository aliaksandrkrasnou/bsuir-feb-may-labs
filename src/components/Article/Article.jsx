import React from 'react';

export const Article = (props) => {
  const { article } = props;

  return (
    <div className="article">
      <div className="title">{article.title}</div>
      <div className="data">
        <div className="image">
          <img src={article.urlToImage} alt={article.title} />
        </div>
        <div className="text">
          <div className="description">{article.description}</div>
          <div className="read-more">
            <a href={article.url} target="_blank" rel="noreferrer">
              Read more
            </a>
          </div>
          <div className="info">
            <div className="published-at">{article.publishedAt}</div>
            <div className="author">{article.author || ''}</div>
            <div className="sourceName">{article.sourceName || ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
