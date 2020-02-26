import React, {Component} from 'react';
import logo from './logo.svg';
import './app.css';
import PathSelector from './PathSelector';
import ValueEditor from './ValueEditor';
import Ajax from './Ajax';
import SplitPane, { Pane } from 'react-split-pane';
import Spinner from './Spinner';
class App extends Component {
	constructor(props){
		super(props);
		this.valueEditor = React.createRef();
		this.spinner = React.createRef();
		this.showSpinner = this.showSpinner.bind(this);
		this.editValue = this.editValue.bind(this);
		
		this.ajax = new Ajax({url:window.location.protocol + "//" + window.location.hostname+':1433/handler'});
			
		this.getChildFolders = this.getChildFolders.bind(this);
		this.saveValue=this.saveValue.bind(this);
		
		this.state={busy:true};
	}
	render(){
		return (
			<div className="App">
				<PathSelector editValue={this.editValue} showSpinner={this.showSpinner} getChildFolders={this.getChildFolders} >
				</PathSelector>
				<ValueEditor ref={this.valueEditor} showSpinner={this.showSpinner} saveValue={this.saveValue} >
				</ValueEditor>
				<Spinner ref={this.spinner} visible={this.state.busy}>
				</Spinner>
			</div>
		);
	}
	getChildFolders(path){
		return new Promise((resolve, reject)=>{
			this.ajax.post({
				data:JSON.stringify({type:'getChildFolders', path:path})
			}).then((res)=>{
				res = JSON.parse(res);
				resolve(res);
			}).catch(reject);
		});
	}
	saveValue(params){
		return new Promise((resolve, reject)=>{
			console.log(params);
			params.type='saveValue';
			this.ajax.post({
				data:JSON.stringify(params)
			}).then((res)=>{
				res = JSON.parse(res);
				resolve(res);
			}).catch(reject);
		});
	}
	showSpinner(){
		return this.spinner.current.show();
	}
	editValue(obj){	
		this.valueEditor.current.editValue(obj);
	}
}

export default App;
