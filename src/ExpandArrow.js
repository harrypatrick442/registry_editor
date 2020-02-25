import React, {Component} from 'react';
import computerIcon from './computer-icon.png';
import arrowSE from './arrow-s-e.png';
import arrowE from './arrow-e.png';
class ExpandArrow extends Component{
	constructor(props){
		super(props);
		console.log(props);
		this.state={expanded:false};
		this.toggleExpanded = this.toggleExpanded.bind(this);
		this.onExpandedChanged = props.onExpandedChanged;
		
	}
	toggleExpanded(){
		this.setState({expanded:!this.state.expanded});
		console.log(this);
		this.onExpandedChanged({expanded:this.state.expanded});
	}
	render(){
		return (
			<img className="expand-arrow" src={this.state.expanded?arrowSE:arrowE} onClick={this.toggleExpanded}/>
		);		
	}
}
export default ExpandArrow;