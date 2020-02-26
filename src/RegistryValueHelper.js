import RegistryTypes from './RegistryTypes';
const RegistryValueHelper = new(function(){
	this.parseAndCheck=(type, value)=>{
		switch(type){
			case RegistryTypes.REG_BINARY:
				let splits = value.split(',');
				let ns=[];
				for(var i=0; i<splits.length; i++){
					const str = splits[i];
					if(!isPositiveNumeric(str))return null;
					let n = parseInt(str);
					if(isNaN(n)||n>255||n<0)return null;
					ns.push(n);
				}
				return ns.join(',');
			case RegistryTypes.REG_DWORD:
			case RegistryTypes.REG_DWORD_LITTLE_ENDIAN:
			case RegistryTypes.REG_DWORD_BIG_ENDIAN:
			{
				if(!isPositiveNumeric(value))return null;
				let parsed = parseInt(value);
				if(isNaN(parsed)||parsed<0||parsed> 4294967295)return null;
				return parsed;
			}
			case RegistryTypes.REG_LINK:
			case RegistryTypes.REG_SZ:
			case RegistryTypes.REG_EXPAND_SZ:
			case RegistryTypes.REG_MULTI_SZ:
			case RegistryTypes.REG_NONE:
				return true;
			case RegistryTypes.REG_QWOWD:
			case RegistryTypes.REG_QWORD_LITTLE_ENDIAN:
			{
				let parsed = parseInt(value);
				if(isNaN(parsed)||parsed<0||parsed> 18446744073709551615)return null;
				return parsed;
			}
		}
	};
	function replaceAll(str, search, replacement){
		return str.split(search).join(replacement);
	}
	function isPositiveNumeric(str){
		 return /^\d+$/.test(str);
	}
})();
export default RegistryValueHelper;