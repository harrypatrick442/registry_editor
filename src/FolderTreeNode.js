import React, {Component} from 'react';
import computerIcon from './computer-icon.png';
import ExpandArrow from './ExpandArrow';
class FolderTreeNode extends Component{ 
	constructor(props){
		super(props);
		this.expand = this.expand.bind(this);
	}
	expand(){
		
	}
	render(){
		return (
		  <span className="folder-tree-node">
			<ExpandArrow onExpand = {this.onExpand}/>
			<img className="computer-icon" src={computerIcon}/>
		  </span>
		);
	}
}
 export default FolderTreeNode;
