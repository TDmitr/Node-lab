
function checkAll(){
	$('#messagePanel').text("");

	const checkName = new Promise(
	(resolve,reject)=>{
		if(burger.name != "") resolve("Name is ok");
		else{
			// const reason = new Error('Name is empty');
			showMessage('Your burger is too sad without name :( Write its name please.');
			reject('Name is empty');
			}
		}
	);

	const checkBread = new Promise(
		(resolve,reject)=>{
			if(burger.bread != "None") resolve("Bread is ok");
			else{
				// const reason = new Error('Bread is mandatory');
				showMessage('Your burger will be strange without bun. Choose bun please.');
				reject('Bread is mandatory');
			}
		}
	);

	const checkMeat = new Promise(
		(resolve,reject)=>{
			if(burger.meat != "None" ) resolve("Meat is ok");
			else{
				// const reason = new Error('Meat is mandatory');
				showMessage('Your burger will be strange without meat. Choose meat please.');
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



let socket = new WebSocket('ws://127.0.0.1/');

function choose(){
  console.log(JSON.stringify(burger));
  socket.send(JSON.stringify(burger));
  showSuccessfulMessage();
}




