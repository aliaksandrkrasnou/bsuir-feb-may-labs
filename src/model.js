import View from "./view.js";
let view = new View();

export default function Model() {
	this.IsCompleted = false;
	this.sources = []; 
	this.loaded = [];
}

const APIKey = "bcebc7a888eb4ad885163a49396d5489";

const blockSize = 5;
const maxDisplayed = 17;

Model.prototype.GetSources = async function(){
    let req = new Request(`https://newsapi.org/v2/sources?apiKey=${APIKey}`);
    this.sources = (await (await fetch(req)).json()).sources;
	view.DisplaySource(this.sources);
}

Model.prototype.GetNews = async function(RequestURL){
    let req = new Request(`https://newsapi.org/v2/${RequestURL}&apiKey=${APIKey}`);
    let res = (await (await fetch(req)).json()).articles;
	console.log(res);
    
	if ( (typeof(res) != "undefined") && (res.length > 0) ) {
		console.log("Some news on horizon!");
		view.Initialize();
		this.loaded = res;
		this.GetMoreNews();
		
	}
    else 
		this.ClearUp();	
}

Model.prototype.GetMoreNews = function() {
	let toDisplay = blockSize;
	
	while ( toDisplay > 0 ) {
		if ( this.loaded.length == view.Displayed ) {
			this.IsCompleted = true;
			view.Complete();
			break;
		}
		
		if ( view.Displayed < maxDisplayed ) {
			view.DisplayArticle(this.loaded[view.Displayed]);
			view.Displayed++;
		}
		else if ( this.IsCompleted == false ) {
			this.IsCompleted = true;
			view.Complete();
			break;
		}
		else 
			break;
		
		toDisplay--;
	}
}

Model.prototype.ClearUp = function() {
	this.loaded = [];
	this.IsCompleted = false;
	view.ClearUp();
}






