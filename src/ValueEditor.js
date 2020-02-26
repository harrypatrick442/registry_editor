import React, {Component} from 'react';
import logo from './logo.svg';
import './value-editor.css';
import closeHoverIcon from './close-hover-icon.png';
import closeIcon from './close-icon.png';
class ValueEditor extends Component{
	constructor(props){
		super(props);
		this.state ={visible:false};
		this.editValue = this.editValue.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.close = this.close.bind(this);
	}
	onMouseEnter(){
		this.setState({hovering:true});
	}
	onMouseLeave(){
		this.setState({hovering:false});
	}
	editValue(params){
		console.log(params);
		this.setState({visible:true});
	}
	close(){
		this.setState({visible:false});
	}
	render(){
		const classNames = "value-editor"+(this.state.visible?" visible":"");
		const closeButtonIcon = this.state.hovering?closeHoverIcon:closeIcon;
		return (
			<div className={classNames}>
				<div className="window">
				 <img src={closeButtonIcon} onClick={this.close} className="close-button" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}></img>
					<div className="field">
						<div className="key">Name</div>
						<div className="value">{this.name}</div>
					</div>
					<div className="field">
						<div className="key">Type</div>
						<div className="value">{this.type}</div>
					</div>
					<div className="field">
						<div className="key"></div>
						<div className="value"></div>
					</div>				
				</div>
			</div>
		);
	}
}

export default ValueEditor;
