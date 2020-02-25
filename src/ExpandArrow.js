import React, {Component} from 'react';
import computerIcon from './computer-icon.png';
import arrowSE from './arrow-s-e.png';
import arrowE from './arrow-e.png';
class ExpandArrow extends Component{
	constructor(props){
		console.log('ExcpandArrow');
		super(props);
		this.state={expanded:false};
		this.toggleExpanded = this.toggleExpanded.bind(this);
		this.onExpandedChanged = props.onExpandedChanged;
		
	}
	toggleExpanded(){
		const newExpanded=!this.state.expanded;
		this.setState({expanded:newExpanded});
		this.onExpandedChanged({expanded:newExpanded});
	}
	render(){
		return (
			<img className="expand-arrow" src={this.state.expanded?arrowSE:arrowE} onClick={this.toggleExpanded}/>
		);		
	}
}
export default ExpandArrow;