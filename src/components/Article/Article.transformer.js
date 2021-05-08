export const articleTransformer = (item) => ({
  sourceId: item.source.id,
  sourceName: item.source.name,
  author: item.author,
  title: item.title,
  description: item.description,
  url: item.url,
  urlToImage: item.urlToImage,
  publishedAt: new Date(item.publishedAt).toLocaleString(),
  content: item.content,
});
