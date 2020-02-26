import React, {Component} from 'react';
import computerIcon from './computer-icon.png';
import arrowSE from './arrow-s-e.png';
import arrowE from './arrow-e.png';
import arrowSEHover from './arrow-s-e-hover.png';
import arrowEHover from './arrow-e-hover.png';
class ExpandArrow extends Component{
	constructor(props){
		super(props);
		this.state={expanded:false, hovering:false};
		this.toggleExpanded = this.toggleExpanded.bind(this);
		this.onExpandedChanged = props.onExpandedChanged;
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		
	}
	toggleExpanded(){
		const newExpanded=!this.state.expanded;
		this.setState({expanded:newExpanded});
		this.onExpandedChanged({expanded:newExpanded});
	}
	onMouseLeave(){
		this.setState({hovering:false});
	}
	onMouseEnter(){
		this.setState({hovering:true});
	}
	render(){
		return (
			<img className="expand-arrow" 
				src={this.state.expanded?
					(this.state.hovering?arrowSEHover:arrowSE):
					(this.state.hovering?arrowEHover:arrowE)
				} onClick={this.toggleExpanded} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}/>
		);		
	}
}
export default ExpandArrow;