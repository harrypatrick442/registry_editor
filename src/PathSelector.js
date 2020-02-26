import React, {Component} from 'react';
import logo from './logo.svg';
import './path-selector.css';
import FolderTreeNode from './FolderTreeNode';
const HIVES=['HKCR','HKCU','HKLM','HKU','HKCC'];
class PathSelector extends Component{
	constructor(props) {
		super(props);
		this.showSpinner = props.showSpinner;
		this.folderTree = React.createRef();
		this.getChildFolders = props.getChildFolders.bind(this);
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
}

export default PathSelector;
