import RegistryTypes from './RegistryTypes';
const RegistryValueHelper = new(function(){
	this.parseAndCheck=(type, value)=>{
		switch(type){
			case RegistryTypes.REG_BINARY:
				let splits = value.split(',');
				let ns=[];
				for(var i=0; i<splits.length; i++){
					let n = parseInt(splits[i]);
					if(isNaN(n)||n>255||n<0)return null;
					ns.push(n);
				}
				return ns.join(',');
			case RegistryTypes.REG_DWORD:
			case RegistryTypes.REG_DWORD_LITTLE_ENDIAN:
			case RegistryTypes.REG_DWORD_BIG_ENDIAN:
			case RegistryTypes.REG_EXPAND_SZ:
			case RegistryTypes.REG_LINK:
			case RegistryTypes.REG_MULTI_SZ:
			case RegistryTypes.REG_NONE:
			case RegistryTypes.REG_QWOWD:
			case RegistryTypes.REG_QWORD_LITTLE_ENDIAN:
			case RegistryTypes.REG_SZ:
		}
	};
	function replaceAll(str, search, replacement){
		return str.split(search).join(replacement);
	}
})();
export default RegistryValueHelper;