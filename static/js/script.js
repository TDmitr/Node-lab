
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

window.onload = function(){
	addIngridients('bread',breadArg,"radio");
  	addIngridients('meat',meatArg,"radio");
  	addIngridients('sauces',saucesArg,"checkbox");
  	addIngridients('misk',miskArg,"checkbox");
};


function checkAll(){
	$('#messagePanel').text("");

	const checkName = new Promise(
	(resolve,reject)=>{
		if(burger.name != "") resolve("Name is ok");
		else{
			// const reason = new Error('Name is empty');
			showMessage('Name is empty');
			reject('Name is empty');
			}
		}
	);

	const checkBread = new Promise(
		(resolve,reject)=>{
			if(burger.bread != "None") resolve("Bread is ok");
			else{
				// const reason = new Error('Bread is mandatory');
				showMessage('Bread is mandatory');
				reject('Bread is mandatory');
			}
		}
	);

	const checkMeat = new Promise(
		(resolve,reject)=>{
			if(burger.meat != "None" ) resolve("Meat is ok");
			else{
				// const reason = new Error('Meat is mandatory');
				showMessage('Meat is mandatory');
				reject('Meat is mandatory');
			}
		}
	);

	let promises = [checkBread,checkMeat,checkName];

	Promise.all(promises)
		.then(res=>
			{console.log(res)})
		.then(fulfilled=>choose())

};

function showMessage(message){
	$('#messagePanel').append(`<div class="alert alert-warning">${message}</div>`);
}
function showSuccessfulMessage(){
	$('#messagePanel').append(`<div class="alert alert-success"> Your burger is successfully sent</div>`);
}

let socket = new WebSocket('ws://127.0.0.1/');

function choose(){
  console.log(JSON.stringify(burger));
  socket.send(JSON.stringify(burger));
  showSuccessfulMessage();
}

$('#nameField').blur(function(event){
	burger.name = event.target.value;
	console.log(burger.name);
});