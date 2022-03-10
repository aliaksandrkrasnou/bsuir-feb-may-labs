
import React from "react";

export function NewsCard({ article }) {
    const { urlToImage, title, description, author, source } = article;
    return (<section className="card">
        <img className="card__image" src={urlToImage} alt="" />
        <h3 className="card__header">{title}</h3>
        <p className="card__description">{description}</p>
        <p className="card__author">{author}</p>
        <span className="card__source">{source.name}</span>
    </section>);
}

