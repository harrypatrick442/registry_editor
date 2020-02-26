import React, {Component} from 'react';
import logo from './logo.svg';
import './path-selector.css';
import FolderTreeNode from './FolderTreeNode';
import Ajax from './Ajax';
const HIVES=['HKCR','HKCU','HKLM','HKU','HKCC'];
class PathSelector extends Component{
	constructor(props) {
		super(props);
		this.showSpinner = props.showSpinner;
		this.folderTree = React.createRef();
		this.ajax = new Ajax({url:window.location.protocol + "//" + window.location.hostname+':1433/handler'});
		this.getChildFolders = this.getChildFolders.bind(this);
		this.editValue = props.editValue;
	}
	render() {		
		return (
			<div className="path-selector">
				<FolderTreeNode ref={this.folderTree} showSpinner={this.showSpinner}
					path="" folder="Computer" getChildFolders={this.getChildFolders} editValue={this.editValue}>
				</FolderTreeNode>
			</div>
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
