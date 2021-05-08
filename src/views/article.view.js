export class ArticleView {
  constructor(articles) {
    this.articles = articles;
  }

  renderItem(article) {
    return `<div class="article">
  <div class="title">${article.title}</div>
  <div class="data">
    <div class="image"><img src="${article.urlToImage}" alt="${article.title}" /></div>
    <div class="text">
      <div class="description">${article.description}</div>
      <div class="read-more"><a href="${article.url}" target="_blank">Read more</a></div>
      <div class="info">
        <div class="published-at">${article.publishedAt}</div>
        <div class="author">${article.author || ''}</div>
        <div class="sourceName">${article.sourceName || ''}</div>
      </div>
    </div>
  </div>
</div>`;
  }

  render() {
    return this.articles.map(this.renderItem).join('');
  }
}
