const searchFrom = document.querySelector('.search');
const input = document.querySelector('.input');
const newsList = document.querySelector('.news-list');
document.getElementById('hide-after-search').hidden = false;
let more_news_but = document.getElementById('more_news_button')
more_news_but.style.visibility = "hidden";
searchFrom.addEventListener('submit', retrieve)

function retrieve(e){
    document.getElementById('news-list').innerHTML = "";
    e.preventDefault()
    const apiKey ='c12f37ae382f43698f77762b732caad4'

          let topic = input.value;
          let select_box = document.getElementById('select-box')
          select_box.hidden = true;
          url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}&pagesize=40`
          fetch(url).then((res) => {
            return res.json()
          }).then((data)=>{
            console.log(data)
            if (data.articles.length > 0){
              document.getElementById('hide-after-search').hidden = true;
              more_news_but.style.visibility = "visibile";
            }
            else{
              document.getElementById('hide-after-search').hidden = false;
              more_news_but.style.visibility = "hidden";
            }
            for (let iter_news = 0; iter_news < 5;iter_news++){
                if (data.articles.length > 0){
                  let current_news = data.articles.shift()
                  let div =  document.createElement('div');
                  div.setAttribute('class', 'current-news')

                  
                  let author = document.createElement('p')
                  author.setAttribute('class', 'author-text')
                  if (current_news.author){
                    author.textContent = 'Author: ' + current_news.author
                  }
                  else{
                    author.textContent = 'Author:'
                  }
                  
                  
                  let content = document.createElement('p')
                  content.setAttribute('class', 'content-text')
                  content.textContent = current_news.description
                  
                  
                  let a = document.createElement('a');
                  a.setAttribute('href',current_news.url);
                  a.setAttribute('target', '_blank');
                  a.setAttribute('class', 'search-link')
                  a.textContent = current_news.title;

                  div.appendChild(a);
                  if (author){
                    div.appendChild(author)}
                  div.appendChild(content)
                  newsList.appendChild(div)
                }
            }
            more_news_button.onclick = function(){
              for (let iter_news = 0; iter_news < 5;iter_news++){
                if (data.articles.length > 0){
                  let current_news = data.articles.shift()
                  let div_cur_news = document.createElement('div')
                  div_cur_news.setAttribute('class', 'current-news')

                  let author = document.createElement('p')
                  author.setAttribute('class', 'author-text')
                  if (current_news.author){
                    author.textContent = 'Author: ' + current_news.author

                  }
                  else{
                    author.textContent = 'Author:'
                  }
                  let content = document.createElement('p')
                  content.setAttribute('class', 'content-text')
                  content.textContent = current_news.description

                  let a = document.createElement('a');
                  a.setAttribute('href',current_news.url);
                  a.setAttribute('target', '_blank');
                  a.setAttribute('class', 'search-link')
                  a.textContent = current_news.title;

                  div_cur_news.appendChild(a);
                  if (author){
                    div_cur_news.appendChild(author)}
                  div_cur_news.appendChild(content)
                  defaultnewsList.appendChild(div_cur_news)
                }
                else{
                  let more_news_but = document.getElementById('more_news_button')
                  more_news_but.style.visibility = "hidden";
                }
              }
            }
          })
        }