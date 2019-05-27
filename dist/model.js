/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/model.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Model; });\n/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view.js */ \"./src/view.js\");\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nvar KEYAPI = 'fde3140779fa420594d49f7c877160bc';\nvar SourcesUrlHeading = 'https://newsapi.org/v2/sources?country=us&language=en';\nvar NewsUrlHeading = 'https://newsapi.org/v2/top-headlines?language=en';\nvar MaxCountPages = 8;\nvar CountNewsOnPage = 5;\n\nvar Model =\n/*#__PURE__*/\nfunction () {\n  function Model() {\n    _classCallCheck(this, Model);\n\n    this.view = new _view_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this);\n    this.KeyApi = KEYAPI;\n    this.sourcesUrlHeading = SourcesUrlHeading;\n    this.newsUrlHeading = NewsUrlHeading;\n    this.countNewsOnPage = 5;\n    this.maxCountPages = MaxCountPages;\n    this.countNews = 0;\n    this.currPage = 1;\n  }\n\n  _createClass(Model, [{\n    key: \"createUrl\",\n    value: function createUrl(heading, currPage, countNewsOnPage, text, source) {\n      var url = heading;\n\n      if (currPage != null) {\n        url += '&page=' + currPage;\n      }\n\n      if (countNewsOnPage != null) {\n        url += '&pageSize=' + countNewsOnPage;\n      }\n\n      if (text !== undefined) {\n        url += '&q=' + text;\n      }\n\n      if (source !== undefined && source !== this.view.anySource) {\n        url += '&sources=' + source;\n      }\n\n      url += '&apiKey=' + this.KeyApi;\n      return url;\n    }\n  }, {\n    key: \"LoadSources\",\n    value: function LoadSources() {\n      var _this = this;\n\n      var url = this.createUrl(this.sourcesUrlHeading, null, null, null, null);\n      var request = new Request(url);\n      fetch(request).then(function (response) {\n        return response.json();\n      }).then(function (json) {\n        if (json.status) {\n          _this.view.LoadSources(json);\n        }\n      });\n    }\n  }, {\n    key: \"ClearScreen\",\n    value: function ClearScreen() {\n      this.view.ClearScreen();\n    }\n  }, {\n    key: \"ShowNews\",\n    value: function ShowNews(text, source) {\n      this.ClearScreen();\n      this.currPage = 1;\n      this.countNews = 0;\n      this.LoadNews(this.currPage, text, source);\n    }\n  }, {\n    key: \"LoadMoreNews\",\n    value: function LoadMoreNews(text, source) {\n      this.currPage++;\n      this.LoadNews(this.currPage, text, source);\n    }\n  }, {\n    key: \"LoadNews\",\n    value: function LoadNews(page, text, source) {\n      var _this2 = this;\n\n      var url = this.createUrl(this.newsUrlHeading, page, CountNewsOnPage, text, source);\n      var request = new Request(url);\n      fetch(request).then(function (response) {\n        return response.json();\n      }).then(function (json) {\n        if (json.status) {\n          _this2.view.ShowNews(json.articles);\n        }\n      });\n    }\n  }]);\n\n  return Model;\n}();\n\n\n\n//# sourceURL=webpack:///./src/model.js?");

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return View; });\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar NewsContainer = document.getElementById('news-container');\nvar SearchButton = document.getElementById('button-search');\nvar SearchInput = document.getElementById('search-text');\nvar SearchSource = document.getElementById('selector-sourses');\nvar LoadMoreButton = document.getElementById('load-more');\nvar NoPhoto = '../src/images/noPhoto.png';\nvar selectId = 'selector-sourses';\nvar notFound = 'There are no articles matching your request';\nvar AnySource = 'any source';\n\nvar View =\n/*#__PURE__*/\nfunction () {\n  function View(model) {\n    _classCallCheck(this, View);\n\n    this.model = model;\n    this.newsContainer = NewsContainer;\n    this.searchButton = SearchButton;\n    this.searchInput = SearchInput;\n    this.searchSource = SearchSource;\n    this.loadMoreButton = LoadMoreButton;\n    this.anySource = AnySource;\n  }\n\n  _createClass(View, [{\n    key: \"NewNewsCard\",\n    value: function NewNewsCard(article) {\n      var newsCard = document.createElement('article');\n      newsCard.className = 'news__news-card';\n      var newsCardHeader = document.createElement('h3');\n      newsCardHeader.className = 'card-item card-header';\n      newsCardHeader.textContent = article.title;\n      newsCard.appendChild(newsCardHeader);\n      var newsCardImage = document.createElement('img');\n      newsCardImage.className = 'card-item card-image';\n\n      if (article.urlToImage !== null) {\n        newsCardImage.setAttribute('src', article.urlToImage);\n      } else {\n        newsCardImage.setAttribute('src', NoPhoto);\n      }\n\n      newsCard.appendChild(newsCardImage);\n      var newsCardDesrription = document.createElement('p');\n      newsCardDesrription.className = 'card-item card-desrription';\n      newsCardDesrription.textContent = article.description;\n      newsCard.appendChild(newsCardDesrription);\n      var newsCardReadMore = document.createElement('a');\n      newsCardReadMore.setAttribute('href', article.url);\n      newsCardReadMore.setAttribute('target', '_blank');\n      newsCardReadMore.className = ' card-item card-read-more';\n      newsCardReadMore.textContent = 'Read more';\n      newsCard.appendChild(newsCardReadMore);\n      return newsCard;\n    }\n  }, {\n    key: \"ShowNews\",\n    value: function ShowNews(articles, currCount) {\n      var _this = this;\n\n      var documentFragment = document.createDocumentFragment();\n\n      if (articles.length !== 0) {\n        articles.forEach(function (article) {\n          documentFragment.appendChild(_this.NewNewsCard(article));\n          _this.model.countNews++;\n        });\n      } else {\n        if (this.model.currPage === 1) {\n          var noNews = this.NoNewsFounded();\n          documentFragment.appendChild(noNews);\n        }\n      }\n\n      if (this.model.countNews > (this.model.maxCountPages - 1) * this.model.countNewsOnPage) {\n        this.DisallowLoadingNews(LoadMoreButton);\n      }\n\n      if (articles.length < 5) {\n        this.DisallowLoadingNews(LoadMoreButton);\n      }\n\n      this.newsContainer.appendChild(documentFragment);\n    }\n  }, {\n    key: \"LoadSources\",\n    value: function LoadSources(json) {\n      var documentFragment = document.createDocumentFragment();\n      var select = document.getElementById(selectId);\n      var firstItem = document.createElement('option');\n      firstItem.value = this.anySource;\n      firstItem.textContent = this.anySource;\n      var sources = json.sources;\n      documentFragment.appendChild(firstItem);\n      sources.forEach(function (sourceItem) {\n        var newItem = document.createElement('option');\n        newItem.value = sourceItem.id;\n        newItem.textContent = sourceItem.name;\n        documentFragment.appendChild(newItem);\n      });\n      select.appendChild(documentFragment);\n    }\n  }, {\n    key: \"NoNewsFounded\",\n    value: function NoNewsFounded() {\n      var noNews = document.createElement('p');\n      noNews.className = 'no-news-found';\n      noNews.textContent = notFound;\n      return noNews;\n    }\n  }, {\n    key: \"DisallowLoadingNews\",\n    value: function DisallowLoadingNews(element) {\n      element.style.display = 'none';\n    }\n  }, {\n    key: \"AllowLoadingNews\",\n    value: function AllowLoadingNews(element) {\n      element.style.display = 'block';\n    }\n  }, {\n    key: \"ClearScreen\",\n    value: function ClearScreen() {\n      this.newsContainer.innerHTML = '';\n      this.AllowLoadingNews(LoadMoreButton);\n    }\n  }]);\n\n  return View;\n}();\n\n\n\n//# sourceURL=webpack:///./src/view.js?");

/***/ })

/******/ });