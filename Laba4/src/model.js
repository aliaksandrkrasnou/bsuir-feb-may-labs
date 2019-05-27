'use strict'

import View from './view.js'

const KEYAPI = 'fde3140779fa420594d49f7c877160bc'
const SourcesUrlHeading = 'https://newsapi.org/v2/sources?country=us&language=en'
const NewsUrlHeading = 'https://newsapi.org/v2/top-headlines?language=en'
const MaxCountPages = 8
const CountNewsOnPage = 5
export default class Model {
  constructor () {
    this.view = new View(this)
    this.KeyApi = KEYAPI
    this.sourcesUrlHeading = SourcesUrlHeading
    this.newsUrlHeading = NewsUrlHeading
    this.countNewsOnPage = 5
    this.maxCountPages = MaxCountPages
    this.countNews = 0
    this.currPage = 1
  }

  createUrl (heading, currPage, countNewsOnPage, text, source) {
    let url = heading
    if (currPage != null) {
      url += '&page=' + currPage
    }
    if (countNewsOnPage != null) {
      url += '&pageSize=' + countNewsOnPage
    }
    if (text !== undefined) {
      url += '&q=' + text
    }
    if ((source !== undefined) && (source !== this.view.anySource)) {
      url += '&sources=' + source
    }
    url += '&apiKey=' + this.KeyApi
    return url
  }

  LoadSources () {
    let url = this.createUrl(this.sourcesUrlHeading, null, null, null, null)
    let request = new Request(url)
    fetch(request).then(function (response) {
      return response.json()
    }).then(json => {
      if (json.status) {
        this.view.LoadSources(json)
      }
    })
  }

  ClearScreen () {
    this.view.ClearScreen()
  }

  ShowNews (page, text, source) {
    this.ClearScreen()
    // this.currPage = 1
    // this.countNews = 0
    this.LoadNews(page, text, source)
  }

  LoadMoreNews (page, text, source) {
    this.LoadNews(page, text, source)
  }

  LoadNews (page, text, source) {
    let url = this.createUrl(this.newsUrlHeading, page, CountNewsOnPage, text, source)
    let request = new Request(url)
    fetch(request).then(function (response) {
      return response.json()
    }).then(json => {
      if (json.status) {
        this.countNews += json.articles.length
        this.ProcessNews(json.articles)
      }
    })
  }

  ProcessNews (articles) {
    if (articles.length !== 0) {
      this.view.ShowNews(articles)
    } else {
      if (this.currPage === 1) {
        this.view.NoNewsToShow()
      }
    }
    if (this.countNews > ((this.maxCountPages - 1) * this.countNewsOnPage)) {
      this.view.DisallowLoadingNews(this.view.loadMoreButton)
    }
    if (articles.length < 5) {
      this.view.DisallowLoadingNews(this.view.loadMoreButton)
    }
  }
}
