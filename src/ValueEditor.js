import React, {Component} from 'react';
import logo from './logo.svg';
import './value-editor.css';
import closeHoverIcon from './close-hover-icon.png';
import closeIcon from './close-icon.png';
import RegistryTypes from './RegistryTypes';
import RegistryValueHelper from './RegistryValueHelper';
import ReactTooltip from 'react-tooltip';
class ValueEditor extends Component{
	constructor(props){
		super(props);
		this.state ={visible:false, name:'', valueType:null, value:'', parsedValue:null, valid:true, savedValue:null};
		this.saveValue = props.saveValue.bind(this);
		this.editValue = this.editValue.bind(this);
		this.valueChanged = this.valueChanged.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.parseAndCheckValueValid = this.parseAndCheckValueValid.bind(this);
		this.close = this.close.bind(this);
		this.save = this.save.bind(this);
	}
	onMouseEnter(){
		this.setState({hovering:true});
	}
	onMouseLeave(){
		this.setState({hovering:false});
	}
	valueChanged(e){
		const value = e.target.value;
		const parsedValue = this.parseAndCheckValueValid(value);
		const passed = parsedValue !== null;
		this.setState({value:value , parsedValue:parsedValue, valid:passed});
	}
	parseAndCheckValueValid(value){
		return RegistryValueHelper.parseAndCheck(this.state.valueType, value);
	}
	editValue(params){
		let value=params.value;
		const type = params.type;
		switch(type){
			case RegistryTypes.REG_BINARY:
			value=value.join(',');
			break;
			case RegistryTypes.REG_MULTI_SZ:
			value=value.join('\n');
			break;
		}
		this.setState({visible:true, name:params.name, valueType:type, parsedValue:null,
			value:value, valid:true, path:params.path, updateValue:params.updateValue, savedState:null, initialValue:value});
	}
	close(){
		this.setState({visible:false});
	}
	save(){
		const state = this.state;
		this.saveValue({name:state.name, value:state.parsedValue, valueType:state.valueType, path:state.path}).then((res)=>{
			if(res.successful){
				this.state.updateValue(state.parsedValue);
				this.setState({savedValue:state.value});
			}
			else alert('Something went wrong');
		}).catch(console.error);
	}
	render(){
		const classNames = "value-editor"+(this.state.visible?" visible":"");
		const closeButtonIcon = this.state.hovering?closeHoverIcon:closeIcon;
		const classNamesValue="value editable"+(this.state.valid?"":" invalid");
		const classNamesValueSingleLine = classNamesValue+(this.state.valueType!==RegistryTypes.REG_MULTI_SZ?" visible":"");
		const isRegMultiSz=this.state.valueType===RegistryTypes.REG_MULTI_SZ;
		const classNamesValueMultiLine= classNamesValue+(isRegMultiSz?" visible":"");
		const classNamesSave = "save"+(this.state.savedValue===this.state.value?" saved":"");
		const saveDissabled = !this.state.valid||this.state.initialValue===this.state.value||this.state.savedValue===this.state.value;
		return (
			<div className={classNames}>
				<ReactTooltip />
				<div className="window">
				 <img src={closeButtonIcon} onClick={this.close} className="close-button" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}></img>
					<div className="field">
						<div className="key" data-tip={this.state.name}>Name</div>
						<div className="value top visible" data-tip={this.state.name}>{this.state.name}</div>
					</div>
					<div className="field">
						<div className="key">Type</div>
						<div className="value visible">{this.state.valueType}</div>
					</div>
					<div className="field">
						<div className="key">Value</div>
						<div className={classNamesValueSingleLine} >
							<input type="text" value={this.state.value} onChange={this.valueChanged}></input>
						</div>
						<textarea value={this.state.value} className={classNamesValueMultiLine} onChange={this.valueChanged}></textarea>
					</div>
					<button className={classNamesSave} onClick={this.save} disabled={saveDissabled}>Save</button>					
				</div>
			</div>
		);
	}
}

export default ValueEditor;
