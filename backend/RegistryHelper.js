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
	this.getHives = function(){
		return HIVES;
	};
})();