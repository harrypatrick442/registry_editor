import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './folder-tree.css';
import FolderTreeNode from './FolderTreeNode';
import computerIcon from './computer-icon.png';
import ExpandArrow from './ExpandArrow';
class FolderTree extends Component{
	constructor(props){
		super(props);
		this.path = props.path;
		this.getChildFolders = props.getChildFolders.bind(this);
		this.children = React.createRef();
		this.onExpandedChanged = this.onExpandedChanged.bind(this);
	}
	onExpandedChanged(){
		this.getChildFolders(this.path).then((childFolders)=>{
			childFolders.forEach((childFolder)=>{
				const reactElement = React.createComponent();
				console.log(reactElement);
				this.children.current.appendChild(reactElement.render());
			});
		}).catch(console.error);
	}
	render(){
		return (
			<div className="folder-tree">
				<div className="title">
					<ExpandArrow onExpandedChanged={this.onExpandedChanged}/>
					<img className="computer-icon" src={computerIcon}/>
				</div>
				<div className="children" ref={this.children}>
				</div>
			</div>
		);
	}
	getChildFolders(){
		
	}
}
 export default FolderTree;
