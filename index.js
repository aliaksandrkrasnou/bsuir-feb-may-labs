const API_KEY = '751da822d3b942139f6d2246e1661781';

function fetchNews(query) {
  //let today = new Date();
  return fetch(
    
    `https://newsapi.org/v2/everything?q=${query}&from=04-27-2019&sortBy=publishedAt&apiKey=${API_KEY}`
  ).then(r => r.json());
}

function renderSourcesFilter(targetDom, sourcesFilterState, onSourceCheck) {
  let formDOM = document.createElement('form');
  for (let [sourceName, checked] of sourcesFilterState.entries()) {
    let checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox';
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = sourceName;
    checkbox.name = sourceName;
    checkbox.checked = checked;
    checkbox.onchange = () => onSourceCheck(sourceName);
    checkboxContainer.appendChild(checkbox);
    let checkboxLabel = document.createElement('label');
    checkboxLabel.htmlFor = sourceName;
    checkboxLabel.innerText = sourceName;
    checkboxContainer.appendChild(checkboxLabel);
    formDOM.appendChild(checkboxContainer);
  }

  targetDom.innerHTML = '';
  targetDom.appendChild(formDOM);
}

function renderArticles(articles, sourcesFilterState, amount) {
  articles = articles.filter(article => sourcesFilterState.get(article.source.name));
  articles = articles.slice(0, amount);
  let articlesHTML = articles.map(article => {
    return `
      <li class="card">
        <div class="img">
          <img src="${article.urlToImage}" alt=""></img>
        </div>
        <div class="text">
          <h2><a href="${article.url}">${article.title}</a></h2>
          <p>${article.description}</p>
          <small>${article.author || ''}</small>
        </div>
      </li>
    `
  }).join('');

  return `
    <div class="cards">
      <ul>
        ${articlesHTML}
      </ul>
    </div>
  `;
}

let queryInput = document.getElementById('query_input');
let searchForm = document.getElementById('search_form');
let articlesContainer = document.getElementById('articles');
let sourcesFiltersDOM = document.getElementById('sources_filter');
let showMoreButtonDOM = document.getElementById('show_more_button');

searchForm.addEventListener('submit', (v) => {
  v.preventDefault();
  let query = queryInput.value;
  main(query);
});

async function main(query) {
  let { articles } = await fetchNews(query);

  let sources = new Set(articles.map(article => article.source.name));
  let sourcesFilterState = new Map([...sources].map(sourceName => [sourceName, true]));
  
  let amount = 5;

  renderSourcesFilter(sourcesFiltersDOM, sourcesFilterState, (sourceName) => {
    sourcesFilterState.set(sourceName, !sourcesFilterState.get(sourceName));
    articlesContainer.innerHTML = renderArticles(articles, sourcesFilterState, amount);
  });

  showMoreButtonDOM.onclick = () => {
    amount += 5;
    articlesContainer.innerHTML = renderArticles(articles, sourcesFilterState, amount);
  };
  
  articlesContainer.innerHTML = renderArticles(articles, sourcesFilterState, amount);
}

main('test');