import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import computerIcon from './computer-icon.png';
import folderIcon from './folder-icon.png';
import ExpandArrow from './ExpandArrow';
import ValueNode from './ValueNode';
import './folder-tree-node.css';
class FolderTreeNode extends Component{ 
	constructor(props){
		super(props);
		this.folder = props.folder;
		this.path = props.path;
		this.getChildFolders = props.getChildFolders.bind(this);
		this.showSpinner = props.showSpinner;
		this.editValue = props.editValue;
		this.childrenWrapper = React.createRef();
		this.expandArrow = React.createRef();
		this.onExpandedChanged = this.onExpandedChanged.bind(this);
		this.onDoubleClick = this.onDoubleClick.bind(this);
		this.gotChildFolders = this.gotChildFolders.bind(this);
		this.state={children:[], expanded:false};
	}
	onExpandedChanged(e){
		this.setState({expanded:e.expanded});
		if(this.state.loadedChildren)return;
		const clearSpinner = this.showSpinner();
		this.getChildFolders(this.path).then((childFolders)=>{
			this.gotChildFolders(childFolders, clearSpinner);
		}).catch(console.error);
		
	}
	onDoubleClick(e){
		e.stopPropagation();
		this.expandArrow.current.toggleExpanded();
	}
	shouldComponentUpdate(nextProps, nextState){
	   return (nextState.loadedChildren!==this.state.loadedChildren)||(this.state.expanded!==nextState.expanded);
	}
	gotChildFolders(childFolders, clearSpinner){
		const children = this.state.children;
		if(childFolders&&childFolders.values){
			for(var name in childFolders.values){
				const obj = childFolders.values[name];
				const path = (this.path?this.path+'\\':'')+name;
				const valueNode = (<ValueNode path={path} key={path} name={name} type={obj.type} value={obj.value} editValue={this.editValue}></ValueNode>);
				children.push(valueNode);
			}
		}
		childFolders&&childFolders.keys&&childFolders.keys.forEach((childFolder)=>{
			const path = (this.path?this.path+'\\':'')+childFolder;
			const childFolderTreeNode = (<FolderTreeNode  showSpinner={this.showSpinner} path={path} key={path} folder={childFolder} getChildFolders={this.getChildFolders} editValue={this.editValue}></FolderTreeNode>);
			children.push(childFolderTreeNode);
		});
		clearSpinner();
		this.setState({children:children, loadedChildren:true});
	}
	render(){
		const classNames = "children-wrapper"+(	this.state.expanded?" visible":"");
		return (
			<div className="folder-tree-node" onDoubleClick={this.onDoubleClick}>
				<div className="row">
					<ExpandArrow ref={this.expandArrow} onExpandedChanged={this.onExpandedChanged}/>
					<img className="computer-icon icon" src={this.path?folderIcon:computerIcon}/>
					<div className="title">
						{this.folder}
					</div>
				</div>
				<div className={classNames} ref={this.childrenWrapper}>
					{this.state.children}
				</div>
			</div>
		);
	}
	getChildFolders(){
		
	}
}
 export default FolderTreeNode;
