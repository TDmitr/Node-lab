
var breadArg = ['Black Bun','White Bun'];
var meatArg = ['Pork','Veal','Chicken','Falafel'];
var saucesArg = ['Ketchup','Mayo','BBQ'];
var miskArg = ['Fresh Cucumber','Tomato','Blue Cheese','Cheddar Cheese','Onion','Pickle'];

var burger = {
	name:"",
    bread: "None",
	meat: "None",
	sauces: [],
	misk: []
};

function showMessage(message){
	$('#messagePanel').append(`<div class="alert alert-warning">${message}</div>`);
}
function showSuccessfulMessage(){
	$('#messagePanel').append(`<div class="alert alert-success"> Your burger is successfully sent</div>`);
}

function addIngridients(elem,arg,type){
    let div = document.createElement('div');
    $(div).addClass('btn-group');
    $(div).attr("data-toggle", "buttons");
    if(type=="radio"){
      div.innerHTML += arg.map(
      (div)=>`<label class="btn btn-primary" onclick="addRadio('${elem}',this)"><input type="radio" name="options">${div}</label>`
      ).join("") ;
    }
    if(type=="checkbox"){
      div.innerHTML += arg.map(
      (div)=>`<label class="btn btn-primary" onclick="addCheckbox('${elem}',this)"><input type="checkbox">${div}</label>`
      ).join("") ;
    }    

  $('#'+elem).append(div);
}

function addRadio(type,elem){
	if(type == "meat") burger.meat = $(elem).text();
	if(type == "bread") burger.bread = $(elem).text();
	var panel = "#choosen" + type;
	$(panel).text($(elem).text());
}

function addCheckbox(type,elem){
	var newElem = $(elem).text();

	var burgerType;
	if(type=="sauces") burgerType = burger.sauces; 
	if(type=="misk") burgerType = burger.misk;  

	if(elem.classList.contains('active')){
        for (var i = 0; i < burgerType.length; i++) { 
    		if(burgerType[i] == newElem) burgerType.splice(i,1);
    	}
    }
    else {
    	burgerType.push(newElem);
    }
    var panel = "#choosen" + type;
    $(panel).text(burgerType.map((elem)=>elem).join(", "));
}

$('#nameField').blur(function(event){
	burger.name = event.target.value;
	console.log(burger.name);
});


window.onload = function(){
	addIngridients('bread',breadArg,"radio");
  	addIngridients('meat',meatArg,"radio");
  	addIngridients('sauces',saucesArg,"checkbox");
  	addIngridients('misk',miskArg,"checkbox");
};

