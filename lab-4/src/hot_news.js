const apiKey ='c12f37ae382f43698f77762b732caad4'
        let request_string = 'news'
        let sources_array = []

          let defaultnewsList = document.querySelector('.news-list');
          let check_source_box = document.getElementById("select-box");
          check_source_box.hidden = true;
          let url = `https://newsapi.org/v2/top-headlines?country=ru&apiKey=c12f37ae382f43698f77762b732caad4&pagesize=40`

          fetch(url).then((res) => {
            return res.json()}).then((data)=>{
              if (data.articles.length > 0){
                document.getElementById('hide-after-search').hidden = true;
              }
            console.log(data.articles)
            data.articles.forEach((current_article) =>{
              if (sources_array.indexOf(current_article.source['name']) == -1){
                sources_array.push(current_article.source['name'])
              }
            })
            console.log(sources_array)
            if (sources_array){
              check_source_box.hidden = false;
              sources_array.forEach((source) => {
                let new_option = document.createElement('option');
                new_option.value = source;
                new_option.innerHTML = source;
                check_source_box.appendChild(new_option)
              })
            }
            check_source_box.addEventListener('change', function(){
              let news_list = [...document.getElementsByClassName("current-news")]
              news_list.forEach((current_div) => {
                if (current_div.getAttribute('source_name') != check_source_box.value){
                  current_div.hidden = true;
                }
                else{
                  current_div.hidden = false;
                }
                console.log(current_div.getAttribute('source_name'))
              })
            })
            for (let iter_news = 0; iter_news < 5;iter_news++){
              if (data.articles.length > 0){
                let more_news_but = document.getElementById('more_news_button')
                more_news_but.style.visibility = "visible";

                let current_news = data.articles.shift()
               
                let div_cur_news = document.createElement('div')
                div_cur_news.setAttribute('class', 'current-news')
                div_cur_news.setAttribute('source_name', data.articles[iter_news].source['name'])

                let author = document.createElement('p')
                author.setAttribute('class', 'author-text')
                author.textContent = 'Author: ' + data.articles[iter_news].author

                let content = document.createElement('p')
                content.setAttribute('class', 'content-text')
                content.textContent = data.articles[iter_news].description


                let a = document.createElement('a');
                a.setAttribute('href',data.articles[iter_news].url);
                a.setAttribute('target', '_blank');
                a.setAttribute('class', 'search-link')
                a.textContent = data.articles[iter_news].title;

                div_cur_news.appendChild(a);
                if (author){
                  div_cur_news.appendChild(author)}
                div_cur_news.appendChild(content)
                defaultnewsList.appendChild(div_cur_news)
              }
            }
          more_news_button.onclick = function(){
            for (let iter_news = 0; iter_news < 5;iter_news++){
              if (data.articles.length > 0){
                let current_news = data.articles.shift()
                  var div_cur_news = document.createElement('div')
                  div_cur_news.setAttribute('class', 'current-news')
                  div_cur_news.setAttribute('source_name', data.articles[iter_news].source['name'])


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
              if (check_source_box.value != div_cur_news.getAttribute('source_name') & check_source_box.value != 'all'){
                div_cur_news.hidden = true;
                iter_news -= 1;
              }
              else{
                console.log(div_cur_news.getAttribute('source_name'))
                div_cur_news.hidden = false;
              }
            }
          }
          })