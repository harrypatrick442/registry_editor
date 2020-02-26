module.exports = new(function(){
	const regedit = require('regedit');
	const HIVES=['HKCR','HKCU','HKLM','HKU','HKCC'];
	this.getChildFolders = function(path){
		return new Promise((resolve, reject)=>{
			if(!path){
				resolve({keys:HIVES});
				return;
			}
			regedit.list(path, (err, result)=>{
				console.log(result);
				if(!result){
					resolve(null);
					return;
				}
				resolve(result[path]);
			});
		});
	};
	this.setValue = function(path, name, type, value){		
		return new Promise((resolve, reject)=>{console.log(arguments);
			regedit.putValue({
				[path]: {
					[name]: {
						value: value,
						type: type
					}
				}
			}, function(err) {
				if(err)reject(err);
				else resolve();
			});
		});
	};
})();