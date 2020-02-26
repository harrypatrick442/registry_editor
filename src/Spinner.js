import React, {Component} from 'react';
import './spinner.css';
import ClipLoader from "react-spinners/ClipLoader";

class Spinner extends Component {
	constructor(props){
		super(props);
		this.valueEditor = React.createRef();
		this.show = this.show.bind(this);
		this.countDownHandles = this.countDownHandles.bind(this);
		this.state={visible:false};
		this.handlesCount=0;
	}
	show(){
		console.log('showing');
		const clear =(()=>{
			let done = false;
			return ()=>{
				console.log('clearing');
				if(done)return;
				done=true;
				this.countDownHandles();
			};
		})();
		this.handlesCount++;
		this.setState({visible:true});
		return clear;
	}
	countDownHandles(){
		this.handlesCount--;
		this.setState({visible:this.handlesCount>0});
	}
	render(){
		const classNames = "spinner"+(this.state.visible?" visible":"");
		return (			
	<div className={classNames}>
				<div className="sweet-loading">
					<ClipLoader
						size={150}
						//size={"150px"} this also works
						color={"#123abc"}
						loading={true}
					/>
				</div>
			</div>
		);
	}
}

export default Spinner;	