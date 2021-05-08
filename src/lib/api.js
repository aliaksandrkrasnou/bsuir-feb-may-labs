const apiKey = '7debb41cee124745a8ae038e063e65c0';
const baseUrl = 'https://newsapi.org/v2/top-headlines?';

export const fetchArticles = (params) => {
  const { page, pageSize, language, searchQuery, category, country } = params;
  const qParams = [`language=${language}`, `page=${page}`, `pageSize=${pageSize}`, `apiKey=${apiKey}`];
  if (searchQuery) {
    qParams.push(`q=${searchQuery}`);
  }
  if (category) {
    qParams.push(`category=${category}`);
  }
  if (country) {
    qParams.push(`country=${country}`);
  }

  const url = `${baseUrl}${qParams.join('&')}`;

  return fetch(url).then((res) => res.json());
};
