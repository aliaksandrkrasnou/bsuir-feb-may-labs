'use strict'

import Model from './model.js'
import View from './view.js'

export default class Controller {
  constructor () {
    this.model = new Model()
    this.view = new View()
  }

  InitializeEvents () {
    this.view.searchSource.addEventListener('change', (event) => {
      this.model.currPage = 1
      this.model.countNews = 0
      this.model.ShowNews(this.model.currPage, this.view.searchInput.value, this.view.searchSource.value)
    })

    this.view.searchButton.addEventListener('click', (event) => {
      this.model.currPage = 1
      this.model.countNews = 0
      this.model.ShowNews(this.model.currPage, this.view.searchInput.value, this.view.searchSource.value)
    })

    this.view.loadMoreButton.addEventListener('click', (event) => {
      this.model.currPage++
      this.model.LoadMoreNews(this.model.currPage, this.view.searchInput.value, this.view.searchSource.value)
    })

    this.view.searchInput.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        this.model.currPage = 1
        this.model.countNews = 0
        this.model.ShowNews(this.model.currPage, this.view.searchInput.value, this.view.searchSource.value)
      }
    })
  }

  Start () {
    this.model.LoadSources()
    this.model.ShowNews()
  }
}
