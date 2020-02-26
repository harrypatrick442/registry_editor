import React, {Component} from 'react';
import logo from './logo.svg';
import './app.css';
import PathSelector from './PathSelector';
import ValueEditor from './ValueEditor';
import SplitPane, { Pane } from 'react-split-pane';
import Spinner from './Spinner';
class App extends Component {
	constructor(props){
		super(props);
		this.valueEditor = React.createRef();
		this.spinner = React.createRef();
		this.showSpinner = this.showSpinner.bind(this);
		this.editValue = this.editValue.bind(this);
		this.state={busy:true};
	}
	render(){
		return (
			<div className="App">
				<PathSelector editValue={this.editValue} showSpinner={this.showSpinner}>
				</PathSelector>
				<ValueEditor ref={this.valueEditor} showSpinner={this.showSpinner}>
				</ValueEditor>
				<Spinner ref={this.spinner} visible={this.state.busy}>
				</Spinner>
			</div>
		);
	}
	showSpinner(){
		return this.spinner.current.show();
	}
	editValue(obj){	
		this.valueEditor.current.editValue(obj);
	}
}

export default App;
