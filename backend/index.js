const express = require('express');
const BodyParser = require('./BodyParser'), CORS=require('./CORS'), RegistryHelper = require('./RegistryHelper');
const app = express();
const port =  1433;
setupPromises();
const cors = new CORS(app);
const bodyParser = new BodyParser(app, 2);
createHandlers();
function createHandlers(){
	app.get('/handler', (req, res) =>{
		console.log('request get');
	});
	app.post('/handler', (req, res) =>{
		const obj = JSON.parse(req.body);
		console.log(obj);
		switch(obj.type){
			case 'getChildFolders':
				RegistryHelper.getChildFolders(obj.path).then((childFolders)=>{
					res.send(JSON.stringify(childFolders));
				}).catch(console.error);
				break;
			case 'saveValue':
			console.log(obj);
				RegistryHelper.setValue(obj.path, obj.name, obj.valueType, obj.value).then(()=>{
					res.send({successful:true});
				}).catch((err)=>{
					res.send({successful:false});
					console.error(err);
				});
				break;
			
		}
	});
	app.listen(port, () => console.log(`registry_editor/backend listening on port ${port}`));
}
function setupPromises(){
	global.Promise=require('bluebird');
	Promise.config({
		warnings: false,
		longStackTraces: true,
		cancellation: true,
		monitoring: true
	});
}