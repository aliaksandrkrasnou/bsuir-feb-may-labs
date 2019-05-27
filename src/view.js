'use strict'

const NewsContainer = document.getElementById('news-container')
const SearchButton = document.getElementById('button-search')
const SearchInput = document.getElementById('search-text')
const SearchSource = document.getElementById('selector-sourses')
const LoadMoreButton = document.getElementById('load-more')
const NoPhoto = '../src/images/noPhoto.png'
const selectId = 'selector-sourses'
const notFound = 'There are no articles matching your request'
const AnySource = 'any source'
export default class View {
  constructor () {
    this.newsContainer = NewsContainer
    this.searchButton = SearchButton
    this.searchInput = SearchInput
    this.searchSource = SearchSource
    this.loadMoreButton = LoadMoreButton
    this.anySource = AnySource
  }

  NewNewsCard (article) {
    let newsCard = document.createElement('article')
    newsCard.className = 'news__news-card'

    let newsCardHeader = document.createElement('h3')
    newsCardHeader.className = 'card-item card-header'
    newsCardHeader.textContent = article.title
    newsCard.appendChild(newsCardHeader)

    let newsCardImage = document.createElement('img')
    newsCardImage.className = 'card-item card-image'
    if (article.urlToImage !== null) {
      newsCardImage.setAttribute('src', article.urlToImage)
    } else {
      newsCardImage.setAttribute('src', NoPhoto)
    }
    newsCard.appendChild(newsCardImage)

    let newsCardDesrription = document.createElement('p')
    newsCardDesrription.className = 'card-item card-desrription'
    newsCardDesrription.textContent = article.description
    newsCard.appendChild(newsCardDesrription)

    let newsCardReadMore = document.createElement('a')
    newsCardReadMore.setAttribute('href', article.url)
    newsCardReadMore.setAttribute('target', '_blank')

    newsCardReadMore.className = ' card-item card-read-more'
    newsCardReadMore.textContent = 'Read more'
    newsCard.appendChild(newsCardReadMore)

    return newsCard
  }

  /* ShowNews (articles, currCount) {
    let documentFragment = document.createDocumentFragment()
    if (articles.length !== 0) {
      articles.forEach((article) => {
        documentFragment.appendChild(this.NewNewsCard(article))
       // this.model.countNews++
      })
    } else {
      if (this.model.currPage === 1) {
        const noNews = this.NoNewsFounded()
        documentFragment.appendChild(noNews)
      }
    }
    if (this.model.countNews > ((this.model.maxCountPages - 1) * this.model.countNewsOnPage)) {
      this.DisallowLoadingNews(LoadMoreButton)
    }
    if (articles.length < 5) {
      this.DisallowLoadingNews(LoadMoreButton)
    }
    this.newsContainer.appendChild(documentFragment)
  }
*/

  ShowNews (articles, currCount) {
    let documentFragment = document.createDocumentFragment()
    articles.forEach((article) => {
      documentFragment.appendChild(this.NewNewsCard(article))
    })
    this.newsContainer.appendChild(documentFragment)
  }

  LoadSources (json) {
    let documentFragment = document.createDocumentFragment()
    let select = document.getElementById(selectId)
    let firstItem = document.createElement('option')
    firstItem.value = this.anySource
    firstItem.textContent = this.anySource
    let sources = json.sources
    documentFragment.appendChild(firstItem)
    sources.forEach(function (sourceItem) {
      let newItem = document.createElement('option')
      newItem.value = sourceItem.id
      newItem.textContent = sourceItem.name
      documentFragment.appendChild(newItem)
    })
    select.appendChild(documentFragment)
  }

  NoNewsFounded () {
    let noNews = document.createElement('p')
    noNews.className = 'no-news-found'
    noNews.textContent = notFound
    return noNews
  }

  DisallowLoadingNews (element) {
    element.style.display = 'none'
  }

  AllowLoadingNews (element) {
    element.style.display = 'block'
  }

  ClearScreen () {
    this.newsContainer.innerHTML = ''
    this.AllowLoadingNews(LoadMoreButton)
  }

  NoNewsToShow () {
    let documentFragment = document.createDocumentFragment()
    const noNews = this.NoNewsFounded()
    documentFragment.appendChild(noNews)
    this.newsContainer.appendChild(documentFragment)
  }
}
