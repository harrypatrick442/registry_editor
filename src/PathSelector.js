import React, {Component} from 'react';
import logo from './logo.svg';
import './path-selector.css';
import FolderTree from './FolderTree';
import Ajax from './Ajax';
const HIVES=['HKCR','HKCU','HKLM','HKU','HKCC'];
class PathSelector extends Component{
	constructor(props) {
		super(props);
		this.folderTree = React.createRef();
		console.log(window.location);
		this.ajax = new Ajax({url:window.location.protocol + "//" + window.location.hostname+':1433/handler'});
		this.getChildFolders = this.getChildFolders.bind(this);
	}
	render() {		
		return (
			<FolderTree ref={this.folderTree} getChildFolders={this.getChildFolders}>
			</FolderTree>
		);
	}
	getChildFolders(path){
		return new Promise((resolve, reject)=>{
			this.ajax.post({
				data:JSON.stringify({type:'getChildFolders', path:path})
			}).then((res)=>{
				res = JSON.parse(res);
				resolve(res);
			}).catch(reject);
		});
	}
}

export default PathSelector;
