import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import computerIcon from './computer-icon.png';
import folderIcon from './folder-icon.png';
import ExpandArrow from './ExpandArrow';
import './folder-tree-node.css';
class FolderTreeNode extends Component{ 
	constructor(props){
		console.log('construct');
		super(props);
		this.folder = props.folder;
		this.path = props.path;
		this.getChildFolders = props.getChildFolders.bind(this);
		this.childrenWrapper = React.createRef();
		this.onExpandedChanged = this.onExpandedChanged.bind(this);
		this.gotChildFolders = this.gotChildFolders.bind(this);
		this.state={children:[], expanded:false, row:this.getRow()};
	}
	getRow(){
		return (
			<div className="row">
				<ExpandArrow onExpandedChanged={this.onExpandedChanged}/>
				<img className="computer-icon icon" src={this.path?folderIcon:computerIcon}/>
				<div className="title">
					{this.folder}
				</div>
			</div>
		);
	}
	onExpandedChanged(e){
		this.setState({expanded:e.expanded});
		if(this.state.loadedChildren)return;
		this.getChildFolders(this.path).then((childFolders)=>{
			this.gotChildFolders(childFolders);
		}).catch(console.error);
		
	}
	shouldComponentUpdate(nextProps, nextState){
		console.log(this.state);
		console.log(nextState);
	   return (nextState.loadedChildren!==this.state.loadedChildren)||(this.state.expanded!==nextState.expanded);
	}
	gotChildFolders(childFolders){
		const children = this.state.children;
		childFolders.forEach((childFolder)=>{
			const path = (this.path?this.path+'\\':'')+childFolder;
			const childFolderTreeNode = (<FolderTreeNode path={path} key={path} folder={childFolder} getChildFolders={this.getChildFolders}></FolderTreeNode>);
			children.push(childFolderTreeNode);
		});
		this.setState({children:children, loadedChildren:true});
	}
	render(){
		console.log(this.state.children);
		const classNames = "children-wrapper"+(	this.state.expanded?" visible":"");
		return (
			<div className="folder-tree-node">
				{
					this.state.row
				}
				{
					<div className={classNames} ref={this.childrenWrapper}>
						{
							this.state.children
						}
					</div>
				}
			</div>
		);
	}
	getChildFolders(){
		
	}
}
 export default FolderTreeNode;
