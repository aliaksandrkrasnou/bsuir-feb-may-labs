export default function View() {
	this.Displayed = 0;
	this.Container = document.getElementById("news");
}

function hide(id) {
    document.querySelector(id).style.display = 'none';
}

function show(id) {
    document.querySelector(id).style.display = 'initial';
}

function prepareToShow(node, data) {
	node.querySelector(".content__img").style.backgroundImage = `url("${data.urlToImage}")`;
	node.querySelector(".content__link").setAttribute("href", data.url);
	node.querySelector(".content__headline").textContent = data.title;
	node.querySelector(".content__src").textContent = data.source.name;
	node.querySelector(".content__blurb").textContent = data.description;
	return node;
}

View.prototype.ClearUp = function() {
	this.Complete();
	let news = document.getElementsByClassName("content");
	console.log("View.ClearUp!");
    while ( news.length > 0 ) 
		news[0].parentNode.removeChild(news[0]);
	
	this.Displayed = 0;
}

View.prototype.Initialize = function() {
	hide(".news-end__body");
	show(".load-news__text");	
}

View.prototype.Complete = function() {
	hide(".load-news__text");
	show(".news-end__body");
}

View.prototype.DisplaySource = function(JArr) {
    const SrcTemplate = document.getElementById("source-template");
    const filter = document.getElementById("navigation__body");
    JArr.forEach(function(src) {
        let node = SrcTemplate.content.cloneNode(true).querySelector(".source");
        node.textContent = src.name;
        node.id = src.id;
        filter.appendChild(node);
    });
}

View.prototype.DisplayArticle = function(JString) {
	let node = document.getElementById("content-template");
	this.Container.appendChild(prepareToShow(node.content.cloneNode(true), JString));
}













