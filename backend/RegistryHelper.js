module.exports = new(function(){
	const regedit = require('regedit');
	const HIVES=['HKCR','HKCU','HKLM','HKU','HKCC'];
	this.getChildFolders = function(path){
		return new Promise((resolve, reject)=>{
			if(!path){
				resolve(HIVES);
				return;
			}
			regedit.list(path, (err, result)=>{
				resolve(result[path].keys);
			});
		});
	};
	this.getHives = function(){
		return HIVES;
	};
})();