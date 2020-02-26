import React, {Component} from 'react';
import logo from './logo.svg';
import './value-editor.css';
import closeHoverIcon from './close-hover-icon.png';
import closeIcon from './close-icon.png';
import RegistryTypes from './RegistryTypes';
import RegistryValueHelper from './RegistryValueHelper';
class ValueEditor extends Component{
	constructor(props){
		super(props);
		this.state ={visible:false, name:'', type:null, value:'', valid:true};
		this.editValue = this.editValue.bind(this);
		this.valueChanged = this.valueChanged.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.parseAndCheckValueValid = this.parseAndCheckValueValid.bind(this);
		this.close = this.close.bind(this);
	}
	onMouseEnter(){
		this.setState({hovering:true});
	}
	onMouseLeave(){
		this.setState({hovering:false});
	}
	valueChanged(e){
		console.log(e);
		const value = e.target.value;
		const valid = this.parseAndCheckValueValid(value);
		console.log(valid);
		this.setState({value: value, valid:valid});
	}
	parseAndCheckValueValid(value){
		const parsed = RegistryValueHelper.parseAndCheck(this.state.type, value);
		return parsed !== null;
	}
	editValue(params){
		console.log(params);
		this.setState({visible:true, name:params.name, type:params.type, value:params.value, valid:true});
	}
	close(){
		this.setState({visible:false});
	}
	render(){
		const classNames = "value-editor"+(this.state.visible?" visible":"");
		const closeButtonIcon = this.state.hovering?closeHoverIcon:closeIcon;
		const classNamesValue="value"+(this.state.valid?"":" invalid");
		const classNamesValueSingleLine = classNamesValue+(this.state.type!==RegistryTypes.REG_MULTI_SZ?" visible":"");
		const classNamesValueMultiLine= classNamesValue+(this.state.type===RegistryTypes.REG_MULTI_SZ?" visible":"");
		return (
			<div className={classNames}>
				<div className="window">
				 <img src={closeButtonIcon} onClick={this.close} className="close-button" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}></img>
					<div className="field">
						<div className="key">Name</div>
						<div className="value top visible">{this.state.name}</div>
					</div>
					<div className="field">
						<div className="key">Type</div>
						<div className="value visible">{this.state.type}</div>
					</div>
					<div className="field">
						<div className="key">Value</div>
						<div className={classNamesValueSingleLine} >
							<input type="text" value={this.state.value} onChange={this.valueChanged}></input>
						</div>
						<textarea value={this.state.value} className={classNamesValueMultiLine} onChange={this.valueChanged}></textarea>
					</div>				
				</div>
			</div>
		);
	}
}

export default ValueEditor;
