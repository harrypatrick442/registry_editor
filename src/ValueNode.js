import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import readableTextIcon from './readable-text-icon.png';
import binaryIcon from './binary-icon.png';
import ExpandArrow from './ExpandArrow';
import RegistryTypes from './RegistryTypes';
import './folder-tree-node.css';
class ValueNode extends Component{ 
	constructor(props){
		super(props);
		this.name = props.name;
		this.type = props.type;
		this.editValue = props.editValue.bind(this);
		this.onClick = this.onClick.bind(this);
		this.updateValue = this.updateValue.bind(this);
		this.state={value:props.value};
	}
	shouldComponentUpdate(nextProps, nextState){
	   return this.state.value!==nextState.value;
	}
	updateValue(){
		
	}
	onClick(e){
		e.stopPropagation();
		this.editValue({name:this.name, type:this.type, value:this.state.value, updateValue:this.updateValue});
	}
	onDoubleClick(e){
		e.stopPropagation();
	}
	render(){
		const classNames = "children-wrapper"+(	this.state.expanded?" visible":"");
		return (
			<div className="value-node" onClick={this.onClick} onDoubleClick={this.onDoubleClick}>
			<div className="row">
				<img className="value-icon icon" src={[
					RegistryTypes.REG_EXPAND_SZ,
					RegistryTypes.REG_LINK,
					RegistryTypes.REG_MULTI_SZ,
					RegistryTypes.REG_SZ
				].indexOf(this.type)>=0?readableTextIcon:binaryIcon}/>
				<div className="title">
					{this.name}
				</div>
			</div>
			</div>
		);
	}
}
 export default ValueNode;
