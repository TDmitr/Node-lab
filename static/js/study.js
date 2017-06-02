
function checkAll(){
	$(elements.message).text("");

	const checkName = new Promise(
	(resolve,reject)=>{
		if(burger.name != "") resolve("Name is ok");
		else{
			message.error('nameError');
			reject(message.nameError);
			}
		}
	);

	const checkBread = new Promise(
		(resolve,reject)=>{
			if(burger.bread != "None") resolve("Bread is ok");
			else{
				message.error('breadError');
				reject(message.breadError);
			}
		}
	);

	const checkMeat = new Promise(
		(resolve,reject)=>{
			if(burger.meat != "None" ) resolve("Meat is ok");
			else{
				// const reason = new Error('Meat is mandatory');
				message.error('meatError');
				reject(message.meatError);
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
  message.success();
}




