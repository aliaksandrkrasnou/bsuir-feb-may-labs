import Model from "./model.js";
let model = new Model();

model.GetSources();
model.GetNews("top-headlines?country=us");

document.getElementById("load-news__button").addEventListener("click", function(e) {
	model.GetMoreNews();
});

document.getElementById("head__input").addEventListener("keyup", function(e) {
	if ( e.keyCode == 13 ) {
		e.preventDefault();
		document.getElementById("head__button").click();
	}
});

document.getElementById("head__button").addEventListener("click", function(e) {
	const req = document.getElementById("head__input").value;
	model.ClearUp();
	if ( req.trim().length > 0 )
		model.GetNews(`top-headlines?q=${req}`);
	else
		model.GetNews("top-headlines?country=us");
});

document.getElementById("navigation__body").addEventListener("click", function(e) {
	if ( e.target.id.localeCompare("navigation__body") != 0 ) {
		model.ClearUp();
		model.GetNews(`everything?sources=${e.target.id}`);
	}
});