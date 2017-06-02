
var breadArg = ['Black Bun','White Bun'];
var meatArg = ['Pork','Veal','Chicken','Falafel'];
var saucesArg = ['Ketchup','Mayo','BBQ'];
var miskArg = ['Fresh Cucumber','Tomato','Blue Cheese','Cheddar Cheese','Onion','Pickle'];

var burger = {
	name:"",
    bread: "None",
	meat: "None",
	sauces: [],
	misk: [],
	checktype: function(type){return this[type];}
};

var elements = {
	message: '#messagePanel',
	choose: '#choosen',
	name: '#nameField'
}

var message ={
	nameError: "Name is mandatory",
	meatError: "Meat is not chosen. Burger is not tasty without meat :(",
	breadError: "Bun is not chosen. Burger is not burger without bread :(",
	ok: "Your burger is successfully sent :)",
	error: function(type){
		$(elements.message).append(`<div class="alert alert-warning">${this[type]}</div>`);
	},
	success: function(){
		$(elements.message).append(`<div class="alert alert-success">${this.ok}</div>`);
	}
}

function deleteElem(arr,value){
	for (var i = 0; i < arr.length; i++) { 
		if(arr[i] == value) arr.splice(i,1);
	}
}


function addIngridients(elem,arg,type) {
    let div = document.createElement('div');
    $(div).addClass('btn-group').attr("data-toggle", "buttons");

    if(type=="radio") {
      div.innerHTML += arg.map(
      (div)=>`<label class="btn btn-primary" onclick="addRadio('${elem}',this)"><input type="radio" name="options">${div}</label>`
      ).join("") ;
    }
    if(type=="checkbox") {
      div.innerHTML += arg.map(
      (div)=>`<label class="btn btn-primary" onclick="addCheckbox('${elem}',this)"><input type="checkbox">${div}</label>`
      ).join("") ;
    }    

  $('#'+elem).append(div);
}


function addRadio(type,elem){
	(type=="meat") ? burger.meat = $(elem).text() : burger.bread = $(elem).text();
	$(elements.choose + type).text($(elem).text());
}


function addCheckbox(type,elem){
	var newElem = $(elem).text();
	var list = burger.checktype(type);

	(elem.classList.contains('active')) ? deleteElem(list,newElem) : list.push(newElem);

    $(elements.choose + type).text(burger.checktype(type).join(", "));
}


$(elements.name).blur(function(event){
	burger.name = event.target.value;
});


window.onload = function(){
	addIngridients('bread',breadArg,"radio");
  	addIngridients('meat',meatArg,"radio");
  	addIngridients('sauces',saucesArg,"checkbox");
  	addIngridients('misk',miskArg,"checkbox");
};

