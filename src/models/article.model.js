export class Article {
  constructor(item) {
    this.sourceId = item.source.id;
    this.sourceName = item.source.name;
    this.author = item.author;
    this.title = item.title;
    this.description = item.description;
    this.url = item.url;
    this.urlToImage = item.urlToImage;
    this.publishedAt = new Date(item.publishedAt).toLocaleString();
    this.content = item.content;
  }
}
